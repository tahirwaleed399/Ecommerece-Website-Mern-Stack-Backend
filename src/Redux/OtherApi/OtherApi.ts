import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import OrderInterface from "../../Interfaces/Order";
import type { ProductInterface } from "../../Interfaces/Product";

export const othersApi: any = createApi({
  reducerPath: "othersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1/" }),
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: (review) => {
        return {
          url: "/product/review",
          body: review,
          method: "PUT",
          headers: { "content-type": "application/json" },
          credentials: "include",
        };
      },
    }),
    updateOrder: builder.mutation({
      query: (data: { orderId: string; status: string }) => {
        return {
          url: "/admin/order/" + data.orderId,
          body: data,
          method: "PUT",
          headers: { "content-type": "application/json" },
          credentials: "include",
        };
      },
    }), 

  }),
});

export const { useAddReviewMutation, useUpdateOrderMutation  } = othersApi;
