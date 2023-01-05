import { ordersApi } from "./OrdersApi";


const extendedApi  = ordersApi.injectEndpoints({
    endpoints: (build) => ({
        updateOrder: build.mutation({
            query: (data: { orderId: string; status: string }) => {
              return {
                url: "/admin/order/" + data.orderId,
                body: data,
                method: "PUT",
                headers: { "content-type": "application/json" },
                credentials: "include",
              };
            },
            invalidatesTags:['orders' as any ]
          }), 
      }),
      overrideExisting: false,
})

export const { useUpdateOrderMutation } = extendedApi