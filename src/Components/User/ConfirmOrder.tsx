import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";
import { AiFillCreditCard } from "react-icons/ai";
import { MdVpnKey, MdDateRange } from "react-icons/md";
import { toast } from "react-toastify";
import { resetCart } from "../../Redux/cartSlice";
import { useAddOrderMutation } from "../../Redux/OrdersApi/OrdersApi";
import { getUser } from "../../Redux/userSlice";

const ConfirmOrder = ({ stripeAPiKey, setStep }: any) => {
  const stripe: any = useStripe();
  const elements: any = useElements();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [addOrder] = useAddOrderMutation();

  let [paymentProcessing, setPaymentProcessing] = useState<boolean>(false);
  let style = {
    base: {
      color: "#777",
      fontFamily: "Avenir",
      fontSize: "20px",
    },
  };
  const { user } = useSelector((state: any) => state.user);
  const { totalPrice, products } = useSelector((state: any) => state.cart);
  let [shippingInfo] = React.useState<any>(
    JSON.parse(localStorage.getItem("shippingInfo") as any)
  );

  React.useEffect(() => {
    setStep(1);
    if (shippingInfo === null) {
      navigate("/cart");
    }
  }, [shippingInfo, setStep, navigate]);
  const handlePayment = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setPaymentProcessing(true);
    const response: any = await axios.post(
      `http://localhost:5000/api/v1/payment/process`,
      {
        amount: totalPrice,
      },
      options
    );
    if (response.status === 200) {
      const confirmPayment = await stripe.confirmCardPayment(
        response.data.client_secret,
        {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: user.name,
              email: user.email,
              address: {
                line1: shippingInfo.address,
                city: shippingInfo.city,
                state: shippingInfo.state,
                postal_code: shippingInfo.pinCode,
                country: shippingInfo.country,
              },
            },
          },
        }
      );

      if (confirmPayment.error) {
        setPaymentProcessing(false);
        toast.error(confirmPayment.error.message);
        return;
      }
      if (confirmPayment.paymentIntent.status === "succeeded") {
        toast.success("Payment Success 🎉");
      

        let tempProducts = products.map((product: any) => {
          return {
            ...product,
            image: product.images[0].url,
            product: product._id,
          };
        });
        addOrder({
          shippingInfo,
          orderItems: tempProducts,
          paymentInfo: {
            id: response.data.client_secret,
            status: "complete",
          },
          itemsPrice: totalPrice,
          taxPrice: 0,
          shippingPrice: 130,
          totalPrice: totalPrice + 130,
        });

        dispatch(resetCart());
        
        setTimeout(()=>dispatch(getUser() as any) , 1000)
        navigate("/order/thankyou");
      } else {
        console.log("payment failed");
        setPaymentProcessing(false);
      }
    }
  };
  return (
    <>
      {
        <Box w={"100%"} maxW="350px" margin="auto ">
          <form onSubmit={handlePayment} className="py-20">
            <Box
              borderRadius={"lg"}
              borderWidth="1px"
              borderColor={"brandPink.400"}
              className="creditInput flex items-center "
            >
              <AiFillCreditCard className="text-3xl" />
              <CardNumberElement
                options={{ style: style }}
                className="paymentInput"
              />
            </Box>
            <Box
              borderRadius={"lg"}
              borderWidth="1px"
              borderColor={"brandPink.400"}
              className="creditInput flex items-center "
            >
              <MdVpnKey className="text-3xl" />
              <CardExpiryElement className="paymentInput" />
            </Box>

            <Box
              borderRadius={"lg"}
              borderWidth="1px"
              borderColor={"brandPink.400"}
              className="creditInput flex items-center "
            >
              <MdDateRange className="text-3xl" />

              <CardCvcElement className="paymentInput" />
            </Box>

            <Button
              isLoading={paymentProcessing}
              disabled={paymentProcessing}
              type="submit"
              w="100%"
              colorScheme={"pink"}
            >
              Confirm Payment{" "}
            </Button>
          </form>
        </Box>
      }
    </>
  );
};

const options = {
  headers: { "content-type": "application/json" },
  withCredentials: true,
  credentials: "include",
};

export default ConfirmOrder;
