import React ,{Fragment, useReducer } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "./Css/productDetail.scss"
import StarRatings from 'react-star-ratings';
// import required modules
import { Autoplay, EffectCards} from "swiper";
import {  Container, GridItem, HStack , Grid, Heading, Text, IconButton, Button, VStack, Flex, Avatar, Badge, Box, Divider } from '@chakra-ui/react';
import {AiOutlineMinusCircle,AiOutlinePlusCircle} from 'react-icons/ai';
// import { mode } from '@chakra-ui/theme-tools';
import {useColorModeValue} from '@chakra-ui/react'
import { useParams } from 'react-router-dom';
import { useGetProductQuery } from '../Redux/ProductsApi/ProductsApi';
import Loader from '../Components/Common/Loader';
import { addProductToCart } from '../Redux/cartSlice';
import { useDispatch } from 'react-redux';

const ProductDetail = () => {
    // const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const primaryColor = useColorModeValue('brandPink.900','brandPink.100');
    const descriptionTextColor = useColorModeValue('gray.800','white');

    const reducer  =  (state:any , action:any)=>{
      
      switch (action.type) {
        case 'increment':
          if(state.count!==5){
            return {count: state.count + 1};

          }else{
            return {count : state.count}
          }
        case 'decrement':
          if(state.count===1){
            return {count : state.count}
            
          }else{
            return {count: state.count - 1};
          }
        default:
          throw new Error();
      }
    }
    const initialState:{count:number} = {
      count:1,
    }
    const [state, dispatchFunc] = useReducer(reducer, initialState);
    let { productId } = useParams();
    let { data } = useGetProductQuery(productId);
const dispatch = useDispatch();
  return (
   <Fragment>



        <Container maxW='container.2xl'>

{ data ?<>
  <Grid  className='my-4' templateColumns='repeat(auto-fit , minmax(280px, 600px))' justifyContent={'center'} >
  <GridItem className='my-7'>
    
    <Swiper
        effect={"cards"}
        grabCursor={true}
        autoplay={{
          delay: 1100,
          disableOnInteraction: false,
        }}
        modules={[EffectCards,Autoplay]}
        className="mySwiper"
      >
        {data.product.images.map((image:any)=>{
          return (<>
          
          <SwiperSlide className='swiperSlideProduct'> <div className="productSlide"><img src={image.url} alt="alt"  /></div> </SwiperSlide>
          </>)
        })}
        
 

      </Swiper>
      
      </GridItem>
  <GridItem  className='my-7'>
<VStack gap={4} alignItems='flex-start'> 
  
<Heading size={'md'}>{data.product.name}</Heading>
<HStack>
  <Flex className="rating" alignItems={'center'}>
    {/* @ts-ignore */}
  <StarRatings starDimension="20px" starSpacing='2px' rating={data.product.rating} starRatedColor="#f4ac45"> </StarRatings>
  <Text className='ml-3' color='purple'>{data.product.numOfReviews}</Text>
  <span className='mx-3'>|</span>
  </Flex>
<div className="category">
{data.product.category}
</div>
</HStack>

{
  data.product.stock > 0 ? <Badge colorScheme={'green'}>In Stock</Badge> : <Badge colorScheme={'red'}>Out of Stock</Badge> 
}

<Text className="price font-bold text-4xl" color={primaryColor}>
Rs : {data.product.price}
</Text>
{
  data.product.stock !== 0 && <><div className="quantity">
  <HStack>
    <Text>
  Quantity  :
    </Text>
  
    <IconButton  onClick={() => dispatchFunc({type: 'decrement' })}  aria-label='Search database' icon={<AiOutlineMinusCircle />} />
    <Heading size={'sm'}>{state.count}</Heading>
    <IconButton   onClick={() => dispatchFunc({type: 'increment'})}  aria-label='Search database' icon={<AiOutlinePlusCircle />} />
  </HStack>
  </div>
  <HStack className="buttons">
  <Button  colorScheme='pink' variant='solid'>
      Buy Now
    </Button>
    <Button colorScheme='teal' variant='solid' onClick={()=>dispatch(addProductToCart({...data.product, quantity : state.count}))}>
      Add to Cart
    </Button>
  </HStack></>
}
</VStack>
  </GridItem>
</Grid>

<Divider></Divider>
<Heading className='my-2' fontSize={'2xl'} >Description :</Heading>
<Text dangerouslySetInnerHTML={{__html : data.product.description}} textAlign={'center'} color={descriptionTextColor} fontSize={'md'}>
</Text>
<Divider></Divider>


<Flex justifyContent={'flex-start'} direction="column">
{
  data.product.reviews.length !== 0 ?
  <>
  {
data.product.reviews.map((review : any)=>{
  return (<Box boxShadow='lg'>
  <Heading size={'xs'}>{review.name}</Heading>
  <HStack justifySelf={'flex-start'} alignItems={'center'} className='my-4'>
<Avatar></Avatar> 
<VStack  alignItems='flex-start' className='my-4'> 
  {/* @ts-ignore */}
<StarRatings  starRatedColor="#f4ac45" starDimension="10px" starSpacing='2px' rating={review.rating} > </StarRatings>
<Text>{review.comment}</Text>
</VStack>
</HStack>
  </Box>)
})
  }
  </> : <Heading size={'sm'}>No Data</Heading>
}



</Flex>
</>
: <Loader></Loader>}
  </Container>

   </Fragment>
  )
}

export default ProductDetail