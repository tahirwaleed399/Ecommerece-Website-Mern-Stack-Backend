import { Avatar, Box,  Container, Divider, Heading, HStack, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, VStack, Button, Flex  } from '@chakra-ui/react'
import React from 'react'
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ProductInterface } from '../../Interfaces/Product';
import {deleteFromCart ,changeQty} from '../../Redux/cartSlice';
const Cart = () => {

  const cart = useSelector((state :any)=> state.cart)
  const dispatch = useDispatch();
 




  return (
    <Container py='10' maxW='container.xl'>
    <Heading size={'lg'}>
      Your Cart : 
    </Heading>
{
  cart.products.length === 0 ? 
  <>
  <Flex flexDir={'column'} h='100%' w='100%' align={'center'} justify='center' gap='30px'>
    <Heading>Nothing to Show in Cart 😟</Heading>
   <Link to='/products'> <Button colorScheme={'yellow'}>Go To Shopping</Button></Link>
  </Flex>
  </> : 
   <>
    <TableContainer>
  <Table variant='striped' colorScheme='pink'>
    <TableCaption>Your All Orders </TableCaption>
    <Thead>
      <Tr>
        <Th>Item</Th>
        <Th>Qty</Th>
        <Th isNumeric>Subtotal</Th>
      
      </Tr>
    </Thead>
    <Tbody>


      {
        cart.products.map((product:ProductInterface)=>{
          return (<>
          
          <Tr>
        <Td>
        <Flex align='center' gap='10px'>
        <Avatar size={'md'}></Avatar>
        <Flex w='100%' flexDir='column' >
        <span className='font-bold'>{product.name}</span>
        <span>Rs : {product.price}</span>
        </Flex>
        </Flex>
        </Td>
        <Td>
        <NumberInput onChange={(qty)=> dispatch(changeQty({qty ,product}))} variant={'filled'} className='font-bold ' size='sm' maxW={20} max={5} defaultValue={product.quantity} min={1}>
    <NumberInputField />
    <NumberInputStepper>
      <NumberIncrementStepper color='white'/>
      <NumberDecrementStepper color='white'/>
    </NumberInputStepper>
  </NumberInput>
</Td>
        <Td className='font-semibold text-xl ' isNumeric>Rs : {product.price * product.quantity}</Td>
        <Td><Box onClick={()=>dispatch(deleteFromCart(product))} className='text-red-600 text-lg cursor-pointer' as={AiFillDelete} ></Box></Td>
      </Tr>
          </>)
        })
      }
 
    </Tbody>

  </Table>
</TableContainer>


<Box maxW={'500px'} w='100%' className='ml-auto'>
  <Divider colorScheme={'pink'}></Divider>

<VStack align='flex-end' padding={'70px 0'}> 
<HStack className='text-xl' w='100%' justify={'space-between'}>
<span>
    Subtotal
  </span>
  <p >  
   Rs {cart.totalPrice}
  </p>
</HStack>
<HStack className='text-xl' w='100%' justify={'space-between'}>
<span>
    Shipping Fee :
  </span>
  <p >  
   Rs 130
  </p>
</HStack>
<HStack className='text-xl my-4' w='100%' justify={'space-between'}>
<h3 className='text-2xl font-bold'>
    Total :
  </h3>
  <h3 className='text-2xl font-bold'>
    Rs :  {cart.totalPrice + 130}
  </h3>
</HStack>

<Link to='/order'> <Button colorScheme={'pink'} >
Proceed To Checkout
</Button></Link>
</VStack>
</Box>
   </>
}

  </Container>
  )
}

export default Cart;