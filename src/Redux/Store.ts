import { configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import cartReducer ,{setCart} from './cartSlice';
import uploadImageReducer from './uploadImagesSlice';
import { ordersApi } from './OrdersApi/OrdersApi';
import { productsApi } from './ProductsApi/ProductsApi';
import { othersApi } from './OtherApi/OtherApi';
import userReducer, { getUser } from './userSlice';
const store:any = configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer,
        [othersApi.reducerPath]: ordersApi.reducer,
        user : userReducer,
        cart : cartReducer,
        uploadImages : uploadImageReducer
    },

    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware).concat(ordersApi.middleware).concat(othersApi.middleware),
  })


  store.dispatch(getUser());
  store.dispatch(setCart());

  export default store;