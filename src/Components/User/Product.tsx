import {
    Flex,
    Circle,
    Box,
    Image,
    // Badge,
    useColorModeValue,
    Icon,
    chakra,
    Tooltip,
  } from '@chakra-ui/react';
import React from 'react';

//   import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
  import { FiShoppingCart } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
  import StarRatings from 'react-star-ratings';
import { useGetProductQuery } from '../../Redux/ProductsApi/ProductsApi';
  
//   import Rating from 'react-rating';
  

   function Product({product}:any) {

    

    return (
      <Flex className='py-10' w="full" alignItems="center" justifyContent="center">
        <Box
        width={'300px'}
          bg={useColorModeValue('white', 'gray.800')}
          maxW="sm"
          borderWidth="1px"
          rounded="lg"
          shadow="lg"
          position="relative">
    
          <Image
          boxSize='300px'
            src={product.images[0].url}
            alt={`Picture of ${product.name}`}
            roundedTop="lg"
          />
  
          <Box p="3">
      
            <Flex mt="1" justifyContent="space-between" alignContent="center">
              <Box
                fontSize="md"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                className='line-clamp'
                >
                {product.name}
              </Box>
              <Tooltip
                label="Add to cart"
                bg="white"
                placement={'top'}
                color={'gray.800'}
                fontSize={'15px'}>
                <chakra.a href={'#'} display={'flex'}>
                  <Icon as={FiShoppingCart} h={5} w={5} alignSelf={'center'} />
                </chakra.a>
              </Tooltip>
            </Flex>
  
            <Flex justifyContent="space-between" alignContent="center">
      
         <Flex alignItems='center' >
      {/* @ts-ignore */}
         <StarRatings starDimension="20px" starSpacing='2px' rating={product.rating} starRatedColor="yellow"> </StarRatings>
            <small>({product.numOfReviews})</small>
         </Flex>
            </Flex>
                  <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
                <Box as="span" color={'gray.600'} fontSize="lg">
                  Rs:
                </Box>
                {product.price.toFixed(2)}
              </Box>
          </Box>
        </Box>
      </Flex>
    );
  }
  

  export default React.memo(Product);