import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import OrderInterface from "../../Interfaces/Order";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1/" }),
  endpoints: (builder) => ({
    addOrder: builder.mutation({
      query: (order: OrderInterface) => {
        return {
          url: "/order/new",
          body: order,
          method: "POST",
          headers: { "content-type": "application/json" },
          credentials: "include",
        };
      },
      
    }),

    getMyOrders: builder.query({
      query: () => {
        return {
          url: "/order/me",
          method: "GET",
          headers: { "content-type": "application/json" },
          credentials: "include",
        };
      },
    }),
    getAllOrders: builder.query({
      query: () => {
        return {
          url: "/admin/orders",
          method: "GET",
          headers: { "content-type": "application/json" },
          credentials: "include",
        };
      },
      providesTags: ["orders" as any],
    }),
    getMyOrder: builder.query({
      query: (orderId: string) => {
        return {
          url: "/order/" + orderId,
          method: "GET",
          headers: { "content-type": "application/json" },
          credentials: "include",
        };
      },
    }),

    
  }),
});
 
export const {
  useAddOrderMutation,
  useGetMyOrdersQuery,
  useGetMyOrderQuery,
  useGetAllOrdersQuery,
}: any = ordersApi;
