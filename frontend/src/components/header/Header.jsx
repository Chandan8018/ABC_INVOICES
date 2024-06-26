import {
  Dropdown,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaMoon, FaSignOutAlt, FaSun, FaUserCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/theme/themeSlice";
import { Button } from "../ui/moving-border";
import { ImProfile } from "react-icons/im";
import { signoutSuccess } from "../../redux/user/userSlice";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";
import { Avatar } from "@mui/material";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { IoIosMail } from "react-icons/io";

function Header() {
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const { currentUser } = useSelector((state) => state.user);

  const StyledBadge = styled(Badge)(() => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      width: "13px",
      height: "13px",
      borderRadius: "50%",
      boxShadow: `0 0 0 2px ${theme}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));
  return (
    <Navbar
      fluid
      className='bg-gray-400 sticky md:top-3 md:mx-14 md:rounded-full opacity-85 z-40'
    >
      <NavbarBrand>
        <Link to='/'>
          <span className='flex justify-start items-center whitespace-nowrap text-xl font-semibold dark:text-white pl-7'>
            <span className='bg-blue-500 dark:bg-[#ff5555] rounded-xl rounded-tr-none rounded-br-none py-1 px-1 text-xl font-bold'>
              ABC
            </span>{" "}
            <span className='bg-[#ff5555] dark:bg-blue-500 rounded-xl rounded-tl-none rounded-bl-none py-1 px-1 text-xl font-bold'>
              INVOICE
            </span>
          </span>
        </Link>
      </NavbarBrand>
      <PlaceholdersAndVanishInput
        placeholders={[
          "What's the first rule of Fight Club?",
          "Who is Tyler Durden?",
          "Where is Andrew Laeddis Hiding?",
          "Write a Javascript method to reverse a string",
          "How to assemble your own PC?",
        ]}
      />
      <div className='flex gap-5 md:order-2 md:pr-10'>
        <Button
          borderRadius='1.75rem'
          className='bg-tansparent text-black dark:text-white border-neutral-200 dark:border-slate-800 w-full h-10 mr-10'
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? (
            <FaSun className='w-5 h-5' />
          ) : (
            <FaMoon className='w-5 h-5' />
          )}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <StyledBadge
                overlap='circular'
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant='dot'
              >
                <Avatar
                  alt={currentUser.username}
                  src={currentUser.profilePicture}
                  sx={{ width: 44, height: 44 }}
                />
              </StyledBadge>
            }
          >
            <Dropdown.Header>
              <div className='flex justify-center items-center gap-2'>
                <StyledBadge
                  overlap='circular'
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant='dot'
                >
                  <Avatar
                    alt={currentUser.username}
                    src={currentUser.profilePicture}
                    sx={{ width: 60, height: 60 }}
                  />
                </StyledBadge>

                <span className='block text-md font-bold text-blue-500 truncate'>
                  @{currentUser.username}
                </span>
              </div>
              <span className='text-sm font-medium text-gray-500 dark:text-gray-400 truncate mt-2 flex justify-center items-center gap-1'>
                <IoIosMail className='w-6 h-6 pt-1' />
                {currentUser.email}
              </span>
            </Dropdown.Header>

            <Link to={"/dashboard?tab=dash"}>
              <Dropdown.Item className='text-blue-500 font-semibold'>
                <ImProfile className='w-4 h-4 mr-2' color='blue' />
                Dashboard
              </Dropdown.Item>
            </Link>

            <Dropdown.Divider />

            <Dropdown.Item
              className='text-red-500 font-semibold'
              onClick={() => {
                dispatch(signoutSuccess());
                navigate("/");
              }}
            >
              <FaSignOutAlt className='w-4 h-4 mr-2' color='red' />
              Sign out
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <Button
            borderRadius='1.75rem'
            className='bg-transparent border-slate-800 mr-4 text-sm font-semibold text-black dark:text-white'
            onClick={() => navigate("/sign-in")}
          >
            Sign In
          </Button>
        )}

        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink active={path === "/"} as={"div"}>
          <Link to='/'>Home</Link>
        </NavbarLink>

        <NavbarLink active={path === "/contact"} as={"div"}>
          <Link to='/contact'>Contact Us</Link>
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}

export default Header;
