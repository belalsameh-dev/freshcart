import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import "./App.css";
import Layout from "./layout/Layout.jsx";
import Register from './pages/Auth/Register.jsx';
import Login from './pages/Auth/Login.jsx';
import ForgetPassword from './pages/Auth/ForgetPassword.jsx';
import ResetCode from './pages/Auth/ResetCode.jsx';
import ResetPassword from './pages/Auth/ResetPassword.jsx';
import ProtectedRoute from './pages/Auth/ProtectedRoute.jsx';
import Home from './pages/Home/Home.jsx';
import Products from './pages/Products/Products.jsx';
import ProductDetails from './pages/ProductDetails/ProductDetails.jsx';
import Categories from './pages/Categories/Categories.jsx';
import SubCategories from './pages/SubCategories/SubCategories.jsx';
import Brands from './pages/Brands/Brands.jsx';
import Orders from './pages/Orders/Orders.jsx';
import ShippingInfo from './pages/ShippingInfo/ShippingInfo.jsx';
import Cart from './pages/Cart/Cart.jsx';
import WishList from './pages/WishList/WishList.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "forgetPassword", element: <ForgetPassword /> },
      { path: "resetCode", element: <ResetCode /> },
      { path: "resetPassword", element: <ResetPassword /> },
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: "products/:id", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: "categories/:id/subcategories", element: <ProtectedRoute><SubCategories /></ProtectedRoute> },
      { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: "shippingInfo", element: <ProtectedRoute><ShippingInfo /></ProtectedRoute> },
      { path: "allorders", element: <ProtectedRoute><Orders /></ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "wishList", element: <ProtectedRoute><WishList /></ProtectedRoute> },
      { path: "*", element: <NotFound /> },
    ]
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <Toaster />
    </>
  );
}

export default App;
