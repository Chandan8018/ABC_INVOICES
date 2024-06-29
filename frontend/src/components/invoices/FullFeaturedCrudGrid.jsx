import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { useSelector } from "react-redux";
import { ToWords } from "to-words";

const toWords = new ToWords();

const calculateNetAmount = (row) => {
  return row.unitPrice * row.quantity - row.discount;
};

const calculateTaxType = (row, placeOfSupply, placeOfDelivery) => {
  return placeOfSupply === placeOfDelivery ? "CGST(9%)/SGST(9%)" : "IGST(18%)";
};

const calculateTaxAmount = (row, placeOfSupply, placeOfDelivery) => {
  const netAmount = calculateNetAmount(row);
  const taxRate = row.taxRate / 100;
  if (calculateTaxType(row, placeOfSupply, placeOfDelivery) === "CGST/SGST") {
    const cgstSgstRate = taxRate / 2;
    return netAmount * cgstSgstRate * 2;
  } else {
    return netAmount * taxRate;
  }
};

const calculateTotalAmount = (row, placeOfSupply, placeOfDelivery) => {
  const netAmount = calculateNetAmount(row);
  const taxAmount = calculateTaxAmount(row, placeOfSupply, placeOfDelivery);
  return netAmount + taxAmount;
};

// Function to initialize rows with calculated values
const initializeRows = (rows, placeOfSupply, placeOfDelivery) => {
  return rows.map((row) => ({
    ...row,
    netAmount: calculateNetAmount(row),
    totalAmount: calculateTotalAmount(row, placeOfSupply, placeOfDelivery),
    taxType: calculateTaxType(row, placeOfSupply, placeOfDelivery),
  }));
};

function EditToolbar(props) {
  const { setRows, setRowModesModel, theme, placeOfSupply, placeOfDelivery } =
    props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        description: "",
        quantity: 0,
        unitPrice: 0,
        discount: 0,
        placeOfSupply: "",
        placeOfDelivery: "",
        netAmount: 0,
        taxRate: 18,
        totalAmount: 0,
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "description" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button
        color='primary'
        startIcon={<AddIcon />}
        onClick={handleClick}
        sx={{ color: theme === "dark" ? "white" : "black" }}
      >
        Add Product
      </Button>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid({
  placeOfSupply,
  placeOfDelivery,
}) {
  const [rows, setRows] = React.useState(
    initializeRows([], placeOfSupply, placeOfDelivery)
  );
  const [rowModesModel, setRowModesModel] = React.useState({});
  const { theme } = useSelector((state) => state.theme);

  const totalAmount = rows.reduce((sum, row) => sum + row.totalAmount, 0);
  const amountInWords = toWords.convert(totalAmount, { currency: true });

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const netAmount = calculateNetAmount(newRow);
    const totalAmount = calculateTotalAmount(
      newRow,
      placeOfSupply,
      placeOfDelivery
    );
    const updatedRow = {
      ...newRow,
      netAmount,
      totalAmount,
      taxType: calculateTaxType(newRow, placeOfSupply, placeOfDelivery),
      isNew: false,
    };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "description",
      headerName: "Description",
      type: "string",
      align: "left",
      headerAlign: "left",
      width: 200,
      editable: true,
    },
    {
      field: "quantity",
      headerName: "Qty",
      type: "number",
      align: "left",
      headerAlign: "left",
      width: 60,
      editable: true,
    },
    {
      field: "unitPrice",
      headerName: "Unit Price(₹)",
      type: "number",
      width: 100,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "discount",
      headerName: "Discount(%)",
      type: "number",
      align: "left",
      headerAlign: "left",
      width: 100,
      editable: true,
    },
    {
      field: "netAmount",
      headerName: "Net Amount(₹)",
      type: "number",
      align: "left",
      headerAlign: "left",
      width: 100,
      editable: false,
    },
    {
      field: "taxType",
      headerName: "Tax Type",
      type: "string",
      align: "left",
      headerAlign: "left",
      width: 150,
      editable: false,
    },
    {
      field: "totalAmount",
      headerName: "Total Amount(₹)",
      type: "number",
      align: "left",
      headerAlign: "left",
      width: 100,
      editable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label='Save'
              sx={{
                color: theme === "dark" ? "white" : "#878E9B",
                backgroundColor: "green",
                "&:hover": {
                  color: "#878E9B",
                },
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label='Cancel'
              sx={{
                color: theme === "dark" ? "white" : "#878E9B",
                backgroundColor: "red",
                "&:hover": {
                  color: theme === "dark" ? "#878E9B" : "white",
                },
              }}
              onClick={handleCancelClick(id)}
              color='inherit'
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label='Edit'
            sx={{
              color: theme === "dark" ? "#878E9B" : "white",
              backgroundColor: "blue",
              "&:hover": {
                color: theme === "dark" ? "white" : "#878E9B",
              },
            }}
            onClick={handleEditClick(id)}
            color='inherit'
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label='Delete'
            sx={{
              color: theme === "dark" ? "#878E9B" : "white",
              backgroundColor: "red",
              "&:hover": {
                color: theme === "dark" ? "white" : "#878E9B",
              },
            }}
            onClick={handleDeleteClick(id)}
            color='inherit'
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 300,
        width: "100%",
        "& .actions": {
          color: theme === "dark" ? "#878E9B" : "black",
        },
        "& .textPrimary": {
          color: theme === "dark" ? "#878E9B" : "black",
        },
        marginTop: "20px",
        marginBottom: "90px",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode='row'
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: (props) => (
            <EditToolbar
              {...props}
              placeOfSupply={placeOfSupply}
              placeOfDelivery={placeOfDelivery}
            />
          ),
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, theme },
        }}
        sx={{
          borderBottomLeftRadius: "none",
          "& .MuiDataGrid-row": {
            color: (params) =>
              rowModesModel[params.id]?.mode === GridRowModes.Edit
                ? "black"
                : theme === "dark"
                ? "#878E9B"
                : "black",
          },
          "& .MuiTablePagination-root": {
            color: theme === "dark" ? "#878E9B" : "black",
          },
          "& .MuiDataGrid-selectedRowCount": {
            color: theme === "dark" ? "#1D56C0" : "black",
          },
          "& .MuiSelect-icon": {
            color: theme === "dark" && "#878E9B",
          },
          "& .MuiTablePagination-actions button": {
            color: theme === "dark" ? "#878E9B" : "inherit",
          },
        }}
      />
      <div
        className={`w-full pl-1 border-[1px] border-opacity-35 ${
          theme === "dark"
            ? "dark:border-opacity-55 border-white dark:bg-slate-800"
            : "border-black bg-white"
        } flex-col items-start gap-2`}
      >
        <div className='w-full py-2 text-xl font-semibold tracking-tighter flex justify-between pr-5'>
          <span>Total: </span>
          <span className='text-md dark:text-[#878E9B]'>{`₹ ${totalAmount.toFixed(
            2
          )} /-`}</span>
        </div>
        <hr />
        <div className='w-full py-2 md:text-xl font-semibold tracking-tighter flex flex-wrap justify-between pr-5'>
          <span>Amount in words: </span>
          <span className='text-sm md:text-[18px] font-light dark:text-[#878E9B]'>
            {amountInWords}
          </span>
        </div>
      </div>
    </Box>
  );
}
