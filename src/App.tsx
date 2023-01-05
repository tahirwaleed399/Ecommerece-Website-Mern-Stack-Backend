import React from "react";
import "./App.scss";
import Footer from "./Components/Common/Footer";
import Navbar from "./Components/Common/Navbar";
import Home from "./Screens/Home";
import { Route, Routes } from "react-router-dom";
import ProductDetail from "./Screens/ProductDetail";
import Products from "./Screens/Products";
import Login from "./Screens/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./Components/Routes/ProtectedRoute";
import Profile from "./Components/User/Profile";
import UpdateProfile from "./Components/Dashboard/UpdateProfile";
import Me from "./Components/Dashboard/Me";
import ChangePassword from "./Components/Dashboard/ChangePassword";
import Cart from "./Components/User/Cart";
import Checkout from "./Components/User/Checkout";
import Order from "./Screens/Order";
import ConfirmOrder from "./Components/User/ConfirmOrder";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Thankyou from "./Components/User/Thankyou";
import OrderDetails from "./Components/User/OrderDetails";
import AdminProtectedRoute from "./Components/Routes/AdminProtectedRoute";
import AddProduct from "./Components/Admin/AddProduct";
import AllProducts from "./Components/Admin/AllProducts";
import UpdateProduct from "./Components/Admin/UpdateProduct";
import AllOrders from "./Components/Admin/AllOrders";
import AddReview from "./Components/User/AddReview";
import Stats from "./Components/Admin/Stats";
import HomeNav from "./Components/Common/HomeNav";
import { useDisclosure } from "@chakra-ui/react";
import PageNotFound from "./Components/Common/PageNotFound";
const stripePromise = loadStripe(
  "pk_test_51LYxZZLccdpUw7HoHoi32Lhjwlf5oKjmtBvjrVL2gDp0FLURWTRKkRJAnNcvT7DExtrWb2zbsI688bp4xvQxQBk800KF2tQwux"
);
function App() {
  const [step, setStep] = React.useState(0);
  const [stripeAPiKey, setStripeApiKey] = React.useState<any>(null);

  async function getApiKey() {
    console.log("going en sey");
    const data: any = await axios.get(
      "http://localhost:5000/api/v1/stripeapikey",
      {
        headers: { "content-type": "application/json" },
        withCredentials: true,
      }
    );
    setStripeApiKey(data.data.stripeapikey);
  }
  React.useEffect(() => {
    getApiKey();
  }, [stripeAPiKey]);
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        ></Route>
        <Route
          path="/products"
          element={
            <Layout>
              <Products />
            </Layout>
          }
        ></Route>
        <Route
          path="/products/:keyword"
          element={
            <Layout>
              <Products />
            </Layout>
          }
        ></Route>
        <Route
          path="/product/:productId"
          element={
            <Layout>
              <ProductDetail />
            </Layout>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        ></Route>

        <Route
          path="/me"
          element={
            <ProtectedRoute>
              <Profile></Profile>
            </ProtectedRoute>
          }
        >
          <Route index element={<Me />}></Route>
          <Route path="updateProfile" element={<UpdateProfile />}></Route>
          <Route path="changePassword" element={<ChangePassword />}></Route>
          <Route path="toReviews" element={<AddReview />}></Route>
          
          <Route
            path="addProduct"
            element={
              <AdminProtectedRoute>
                <AddProduct  product={null}/>
              </AdminProtectedRoute>
            }
          ></Route>  
          <Route
            path="stats"
            element={
              <AdminProtectedRoute>
                <Stats  />
              </AdminProtectedRoute>
            }
          ></Route> 
          
          <Route
            path="allProducts"
            element={
              <AdminProtectedRoute>
                <AllProducts/>
              </AdminProtectedRoute>
            }
          ></Route> 
          <Route
            path="updateProduct/:id"
            element={
              <AdminProtectedRoute>
                <UpdateProduct />
              </AdminProtectedRoute>
            }
          ></Route>
           <Route
            path="allOrders"
            element={
              <AdminProtectedRoute>
                <AllOrders />
              </AdminProtectedRoute>
            }
          ></Route>

          <Route path="order/:id" element={<OrderDetails />}></Route>
        </Route>

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Layout>
                {" "}
                <Cart></Cart>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRoute>
              <Layout>
                {" "}
                <Order step={step} setStep={setStep}></Order>
              </Layout>
            </ProtectedRoute>
          }
        >
          <Route index element={<Checkout setStep={setStep} />}></Route>

          <Route
            path="confirm"
            element={
              <Elements stripe={stripePromise}>
                <ConfirmOrder setStep={setStep} stripeAPiKey={stripeAPiKey} />
              </Elements>
            }
          ></Route>

          <Route
            path="thankyou"
            element={<Thankyou setStep={setStep} />}
          ></Route>
        </Route>

        <Route path='*' element={<Layout><PageNotFound/></Layout>}></Route>
      </Routes>
    </>
  );
}

export default App;

const Layout = ({ children }: any) => {

    // Nav and Home Nav Disclosure 
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
          {/* Home Navbar Which Discclousre is above and functions passed to normal nav below */}
          <HomeNav onClose={onClose} isOpen={isOpen}></HomeNav>
      <Navbar onOpen={onOpen} ></Navbar>
      {children}
      <Footer></Footer>
    </>
  );
};
