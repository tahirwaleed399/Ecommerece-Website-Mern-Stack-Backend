import { Badge, Box, Center, Flex, Heading, Image, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import OrderInterface from "../../Interfaces/Order";
import { useGetMyOrderQuery } from "../../Redux/OrdersApi/OrdersApi";
import GoBack from "../Common/GoBack";
import Loader from "../Common/Loader";

const OrderDetails = () => {
  const { id: orderId } = useParams();
  let { data , isLoading}: any = useGetMyOrderQuery(orderId);
  let boxBg =useColorModeValue('white', 'gray.800');
  return (
    <div>
        <GoBack ></GoBack>
     {
        !isLoading ?
        <Box p="5">
        <Flex alignItems={"center"}>
          <Heading size="lg">
            Order ID :{" "}
            <Text display="inline" color={"brandPink.100"}>
              {data.order._id}
            </Text>
          </Heading>
          <Badge
            rounded={"lg"}
            className="ml-10"
            colorScheme={
              data.order.orderStatus.toLocaleLowerCase() === "processing"
                ? "yellow"
                : "green"
            }
          >
            {data.order.orderStatus}
          </Badge>
        </Flex>

        <Heading size={'md'} className='my-10'>Phone No : {data.order.shippingInfo.phoneNo}</Heading>
        <Heading size={'md'} className='my-10'>State : {data.order.shippingInfo.state}</Heading>
        <Heading size={'md'} className='my-10'>City : {data.order.shippingInfo.city}</Heading>
        <Heading size={'md'} className='my-10'>Address : {data.order.shippingInfo.address}</Heading>
        <Heading size={'md'} className='my-10'>Order Items :</Heading>
        <Flex wrap={'wrap'} alignItems='center' justifyContent={'center'} >
      {
        data.order.orderItems.map((orderItem:any)=>{
            return (<Link to={`/product/${orderItem.product}`}>
            
            <Center py={12} mx='5' my='3'>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={boxBg}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}>
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${'https://bit.ly/kent-c-dodds'})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}>
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={orderItem.image ? orderItem.image : 'https://bit.ly/kent-c-dodds'}
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            X {orderItem.quantity}
          </Text>
          <Heading className="line-clamp" fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            {orderItem.name}
          </Heading>
          <Stack direction={'row'} align={'center'}>
            <Text fontWeight={800} fontSize={'xl'}>
              Rs : {orderItem.price}
            </Text>
         
          </Stack>
        </Stack>
      </Box>
    </Center>
            </Link>)
        })
      }
        </Flex>
      </Box> : <Loader></Loader>
     }
    </div>
  );
};

export default OrderDetails;
