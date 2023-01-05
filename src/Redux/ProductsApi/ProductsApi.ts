import { createApi , fetchBaseQuery } from  '@reduxjs/toolkit/query/react'
import OrderInterface from '../../Interfaces/Order';
import type {ProductInterface} from '../../Interfaces/Product';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1/' }),
    endpoints: (builder) => ({
      getProducts: builder.query<ProductInterface[], Options>({
        query: (options ) => {return {
          url:options.category.toLowerCase() === 'all'? 
               `products?page=${options.page}&price[lte]=${options.price[1]}&price[gte]=${options.price[0]}&keyword=${options.keyword}` :
               `products?page=${options.page}&price[lte]=${options.price[1]}&price[gte]=${options.price[0]}&category=${options.category}&keyword=${options.keyword}`,
          method: 'GET',
         
      }},
      providesTags:['products' as any]
      }),
       getProduct: builder.query<ProductInterface, string>({
        query: (productId ) => {return {
          url:'product/'+productId,
          method: 'GET',
         
      }}
      }),
      addProduct: builder.mutation({
        query: (product) => {
          return {
            url: "/admin/product/new",
            body: product,
            method: "POST",
            headers: { "content-type": "application/json" },
            credentials: "include",
            withCredentials:true 
          };
        },
        invalidatesTags:['products' as any]
      }),
      getAdminProducts: builder.query({
        query: () => {
          return {
            url: "/admin/products",
            method: "GET",
            headers: { "content-type": "application/json" },
            credentials: "include",
          };
        },

        providesTags:['products' as any]
      }), 
      deleteProduct: builder.mutation({
        query: (_id) => {
          return {
            url: "/admin/product/"+_id,
            method: "DELETE",
            headers: { "content-type": "application/json" },
            credentials: "include",
          };
        },
        invalidatesTags:['products' as any]
      }),

      updateProduct: builder.mutation({
        query: (product) => {
          return {
            url: "/admin/product/"+product.id,
            body:product,
            method: "PUT",
            headers: { "content-type": "application/json" },
            credentials: "include",
          };
        },
        invalidatesTags:['products' as any]
      }),  
       
      
    }),


 



  });


  export const { useGetProductsQuery, useGetProductQuery, useAddProductMutation , useGetAdminProductsQuery  , useDeleteProductMutation , useUpdateProductMutation } :any= productsApi;
    interface Options {

      page : number,
      price:number[],
      category: string,
      keyword:string
    }


    // <{success : boolean , order : OrderInterface} ,{rating : number , comment : string , productId :string} >