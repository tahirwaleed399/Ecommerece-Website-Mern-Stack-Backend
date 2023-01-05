import { createSlice } from "@reduxjs/toolkit";
import { ProductInterface } from "../Interfaces/Product";
// : cartAdapter.getInitialState({
//   totalPrice : 0,
//   numOfItems : 0 ,

// })

let initialState: State = {
  products: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems") as any)
    : [],
  totalPrice: 0,
  numOfItems: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    setCart(state: any) {
      state.totalPrice = 0;
      state.numOfItems = state.products.reduce(
        (totalNumOfItems: number, product: any) => {
          return (totalNumOfItems += product.quantity);
        },
        0
      );

      state.totalPrice = state.products.reduce(
        (total: number, product: any) => {
          return total + product.price * product.quantity;
        },
        0
      );
    },

  resetCart(state : any){
    console.log('reset Cart Called')
    state.products = [];
    state.numOfItems = 0;
    state.totalPrice = 0;
    localStorage.removeItem('cartItems');

    },


    addProductToCart(state, { payload }) {
      const productIndex = state.products.findIndex(
        (product: ProductInterface) => product._id === payload._id
      );
      console.log(productIndex);

      if (productIndex >= 0) {
        console.log(state.products[productIndex].quantity);

        state.products[productIndex].quantity += payload.quantity;
        let tempQ: any = state.products[productIndex].quantity;
        if (tempQ > 5) {
          state.products[productIndex].quantity = 5;
        }
      } else {
        state.products.push(payload);
      }
      cartSlice.caseReducers.setCart(state);
      localStorage.setItem("cartItems", JSON.stringify(state.products));
    },
    deleteFromCart(state, { payload }) {
      const productIndex = state.products.findIndex(
        (product: ProductInterface) => product._id === payload._id
      );
      state.products.splice(productIndex, 1);
      cartSlice.caseReducers.setCart(state);
      localStorage.setItem("cartItems", JSON.stringify(state.products));
    },
    changeQty(state, { payload }) {
      let { qty, product } = payload;
      const productIndex = state.products.findIndex(
        (productF: ProductInterface) => productF._id === product._id
      );
      state.products[productIndex].quantity = Number(qty);
      cartSlice.caseReducers.setCart(state);

      localStorage.setItem("cartItems", JSON.stringify(state.products));
    },
  },
});

export const { setCart, addProductToCart, deleteFromCart, changeQty ,resetCart} =
  cartSlice.actions;

export default cartSlice.reducer;

interface State {
  numOfItems: number;
  totalPrice: number;
  products: ProductInterface[] | any;
}
