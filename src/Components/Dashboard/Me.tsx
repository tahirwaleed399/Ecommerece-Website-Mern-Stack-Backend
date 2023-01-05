import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { format } from "date-fns";
import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import OrderInterface from "../../Interfaces/Order";
import { useGetMyOrdersQuery } from "../../Redux/OrdersApi/OrdersApi";
import Loader from "../Common/Loader";

const Me = () => {
  const userState = useSelector((state: any) => state.user);
const {data,isLoading} = useGetMyOrdersQuery();
  return (
    <div>
      {userState.user ? (
        <>
          {userState.isLoading ? (
            <Loader></Loader>
          ) : (
            <Box p="5" boxShadow={"sm"}>
              <Flex justifyContent={"center"} gap="2rem" alignItems={"center"}>
                <VStack>
                  <Avatar
                    src={
                      userState.user.avatar.url
                        ? userState.user.avatar.url
                        : "images/user.png"
                    }
                    size="2xl"
                  ></Avatar>
                  <Badge colorScheme="green">{userState.user.role}</Badge>
                </VStack>
                <VStack>
                  <Heading>{userState.user.name}</Heading>
                  <Text>{userState.user.email}</Text>
                </VStack>
              </Flex>
            </Box>
          )}

          <Box>
            <Heading size={"2xl"} className="mx-5 mb-20">
              Orders :
            </Heading>

            <TableContainer>
              <Table variant="simple" colorScheme={"pink"} boxShadow={"xl"}>
                <TableCaption>-----End-----</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Date </Th>
                    <Th>Order Items</Th>
                    <Th>Status</Th>
                    <Th isNumeric>Total</Th>
                  </Tr>
                </Thead>
                <Tbody>
                

                  {!isLoading && data.orders.map((order : OrderInterface)=>{

                    return (<>
                     <Tr>


                    <Td>
                     <Link to={`order/${order._id}`}>
                      {format(new Date(order.createdAt) ,'dd MMMM yyyy') as any}
                     </Link>
                      
                      </Td>
                    <Td>
                      <Flex
                        gap={"10px"}
                        align={"flex-start"}
                        justify="flex-start"
                        flexWrap={"wrap"}
                      >
                        <AvatarGroup size={{base :'sm', md :'md'}} max={2}>

                          {
                            order.orderItems.map((orderItem: any)=>{

                              return (<>
                               <Avatar
                            name="Ryan Florence"
                            src={orderItem.image ? orderItem.image :	'https://bit.ly/ryan-florence'}
                          />
                          <Badge colorScheme={'green'} borderRadius='full' className="mx-1">{orderItem.quantity}</Badge>
                              </>)
                            })
                          }
                         
                        </AvatarGroup>
                      </Flex>
                    </Td>

                    <Td>
                    <Link to={`order/${order._id}`}>
                      <Badge colorScheme={order.orderStatus.toLocaleLowerCase() ==='processing' ? 'yellow' : 'green'} borderRadius="lg">
                       {order.orderStatus}
                      </Badge>
                    </Link>
                    </Td>
                    <Td isNumeric>
                    <Link to={`order/${order._id}`}>
                      
                      <Heading size='sm'>{order.totalPrice}</Heading>
                    </Link>
                      
                      
                      </Td>
                  </Tr> 

                    
                    </>)

                  })} 
                  
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </>
      ) : (
        <Loader></Loader>
      )}

    </div>
  );
};

export default Me;
