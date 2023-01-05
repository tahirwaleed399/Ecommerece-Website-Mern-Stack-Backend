import { Box, Heading,  VStack} from '@chakra-ui/react'


import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay,Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Product from '../Components/User/Product';
import './Css/home.scss'
// import "./styles.css";
import { useGetProductsQuery } from '../Redux/ProductsApi/ProductsApi';
import { ProductInterface } from '../Interfaces/Product';
import { Link } from 'react-router-dom';
import Loader from '../Components/Common/Loader';
import Search from '../Components/User/Search';
const Home = () => {
  const {data , isError  ,  error }=useGetProductsQuery({page:1, price:[0,500000],category:'all',keyword:''});


  let productsContent = <Loader></Loader>
  if(data){
    productsContent =  data.allProducts.map((product:ProductInterface)=>{
    
      return (
       <SwiperSlide key={product._id}><Link to={`/product/${product._id}`}><Product product={product}/></Link></SwiperSlide>
      )
   
     })
  }else if(isError){
    productsContent = <h1>{error}</h1>
  }
  return (
    <>
  <Box position={'relative'}  height={'100vh'} width={'100vw'} >
 <div className='overlay' >
      
<VStack height={'full'} justifyContent='center' alignItems='center'>
  <Heading > Ahmed Mobilez</Heading>
 <Search></Search>
</VStack>

      </div>


  <Swiper 
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      
      
        modules={[Autoplay]}
        className="mySwiper h-full"
      >
         
        <SwiperSlide><img className='h-full w-full' src="https://source.unsplash.com/1600x900/?charger,cable,accessories,mobile,macbook" alt="" /></SwiperSlide>
        <SwiperSlide><img className='h-full w-full' src="https://source.unsplash.com/1600x900/?cable,charger,internet,network" alt="" /></SwiperSlide>
        <SwiperSlide><img className='h-full w-full' src="https://source.unsplash.com/1600x900/?samsung" alt="" /></SwiperSlide>
        <SwiperSlide><img className='h-full w-full' src="https://source.unsplash.com/1600x900/?mobiles,vivo,oppo" alt="" /></SwiperSlide>
        <SwiperSlide><img className='h-full w-full' src="https://source.unsplash.com/1600x900/?laptop,computers" alt="" /></SwiperSlide>
  
      </Swiper>

      </Box>

   
     <Swiper
        slidesPerView={1}
        breakpoints={{
          // when window width is >= 640px
          500: {
            slidesPerView: 1,
          },
          // when window width is >= 768px
         
          999: {
            slidesPerView: 3,
          },  
            1100: {
            slidesPerView: 4,
          },
        }}

        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      
        modules={[Pagination,Autoplay]}
        className="mySwiper"
      >



      

{
  productsContent
}
    </Swiper>


        
    </>
  )
}

export default Home