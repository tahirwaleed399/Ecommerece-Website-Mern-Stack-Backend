import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import OrderInterface from "../../Interfaces/Order";
import { useUpdateOrderMutation } from "../../Redux/OrdersApi/Extended";
import { useGetAllOrdersQuery } from "../../Redux/OrdersApi/OrdersApi";
// is ko api men se khatam karna he 
// import {  useUpdateOrderMutation } from "../../Redux/OtherApi/OtherApi";

import Loader from "../Common/Loader";


const AllOrders = () => {
  let [updateOrder , orderStatus]= useUpdateOrderMutation()
    let {data , isLoading, isSuccess} = useGetAllOrdersQuery();
  return (
    <>
   
    {
      !isLoading  && 
      <div>
      <Box className="my-20">
        <Heading className="text-center my-4">All Orders</Heading>
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>Order Id</Th>
                <Th>Name</Th>
                <Th>Status</Th>
                <Th isNumeric>Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
       {isSuccess && 
        data.orders.map((order:OrderInterface)=>{
            return (<>
                 <Tr>
        <Td><Link to ={`/me/order/${order._id}`}>
            <span className="text-blue-500">{order._id}</span>
            </Link></Td>
        <Td>{format(new Date(order.createdAt) , 'dd MMM yyyy')}</Td>
        <Td >
        
        
        <Menu>
  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
  <Badge cursor={'pointer'} colorScheme={order.orderStatus.toLocaleLowerCase() ===  'processing' ? 'pink' : 'green'} className="rounded">{order.orderStatus}</Badge>
  </MenuButton>
  <MenuList>
    <MenuItem  minH='48px' 
    onClick={()=>updateOrder({orderId : order._id , status : 'shipped'})} >
    {/* onClick={()=>updateOrder({orderId : order._id , status : 'shipped'})} */}
    
      <span>Shipped</span>
    </MenuItem>
    <MenuItem  minH='48px' 
    onClick={()=>updateOrder({orderId : order._id , status : 'delivered'})} 
    
    >
      <span>Delivered</span>
    </MenuItem>
  </MenuList>
</Menu>
        
        
        </Td>
        <Td isNumeric>{order.totalPrice}</Td>
      </Tr>
            </>)
        })
       }
           
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </div> 
    
    }
   
    </>
  );
};

export default AllOrders;
