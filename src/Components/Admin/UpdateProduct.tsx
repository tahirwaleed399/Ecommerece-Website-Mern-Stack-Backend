import React from 'react'
import { useParams } from 'react-router-dom'
import { ProductInterface } from '../../Interfaces/Product';
import { useGetProductQuery } from '../../Redux/ProductsApi/ProductsApi';
import AddProduct from './AddProduct';

const UpdateProduct = () => {
    const {id:productId} = useParams();
    let {data,isLoading} = useGetProductQuery(productId)
  return (<>
  
  
 {

!isLoading &&  <AddProduct product={data.product as ProductInterface}></AddProduct>
 }
  </>
  )
}

export default UpdateProduct