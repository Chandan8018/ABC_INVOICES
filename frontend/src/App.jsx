import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import FooterComp from "./components/footer/FooterComp";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/privateroute/PrivateRoute";
import SideBarComp from "./components/dash/SideBarComp";
import Dashboard from "./pages/Dashboard";
import UpdateCustomer from "./pages/UpdateCustomer";
import UpdateSupplier from "./pages/UpdateSupplier";
import ViewInvoice from "./pages/ViewInvoice";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='*' element={<Home />} />
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/test' element={<SideBarComp />} />

        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route
            path='/update-customer/:customerId'
            element={<UpdateCustomer />}
          />
          <Route
            path='/update-supplier/:supplierId'
            element={<UpdateSupplier />}
          />
          <Route path='/invoice/:orderNumber' element={<ViewInvoice />} />
        </Route>
      </Routes>
      <FooterComp />
    </BrowserRouter>
  );
}

export default App;
