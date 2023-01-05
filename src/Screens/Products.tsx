import { Button, Container,  Heading, IconButton, SimpleGrid, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Product from '../Components/User/Product'
import { ProductInterface } from '../Interfaces/Product';
import { useGetProductsQuery } from '../Redux/ProductsApi/ProductsApi';
import Loader from '../Components/Common/Loader';
import ReactPaginate from 'react-paginate';
import {GrCaretNext, GrCaretPrevious} from 'react-icons/gr';
import {AiTwotoneFilter} from 'react-icons/ai'
import DrawerComponent from '../Components/User/DrawerComponent';
// import Drawer from '../Components/Drawer';
// import {  DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input } from '@chakra-ui/react'


const Products = () => {


  // Function which Handles Pagination Number Clickz 
  function handlePagination(e:{selected:number}){
    setCurrentPage(e.selected + 1);
  }
//Variables
const {keyword} = useParams();
  
  let [currentPage  , setCurrentPage] = useState<number>(1);
  let [price  , setPrice] = useState<number[]>([0,500000]);
  let [category  , setCategory] = useState<string>('All');
  let  {data , isError, error, isLoading}=useGetProductsQuery( {page:currentPage, price, category,keyword:keyword?keyword :''});
  let  content  = <Loader></Loader>
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

// Setting  content  According to states of loading or error 
if(data){
   content = 
  <SimpleGrid minChildWidth='300px' spacing='40px'>
  {
    data && data.success &&  data.allProducts.map((product:ProductInterface)=>{
      
     return (
      <Link to={`/product/${product._id}`}><Product product={product}/></Link>
     )
  
    })
  }
  {
    data && data.filteredProductsCount === 0  &&  <h1 className='my-4 text-2xl text-center font-bold'>Sorry😢 Nothing To Show</h1>
    
  }
  </SimpleGrid>
}else if(isError){
   content = <h1>{error}</h1>
}else if(isLoading){
   content  = <Loader></Loader>
}




// Main Content 
  return (
    <>
    
    
    <Container maxW='1200px' >

<Heading textAlign={'center'}  className="my-3">All Products</Heading>

<Button onClick={onOpen}  ref={btnRef as any}  leftIcon={<AiTwotoneFilter />} colorScheme='pink' variant='solid'>
    Filter
</Button>
<DrawerComponent setCategory={setCategory} setPrice={setPrice} onClose={onClose} onOpen={onOpen} isOpen={isOpen} btnRef={btnRef}></DrawerComponent>

{content}
{
  data && <div className='paginationWrapper'> <ReactPaginate
  breakLabel={<ButtonIcon Icon={<GrCaretNext />}></ButtonIcon>}
  nextLabel={<ButtonIcon Icon={<GrCaretNext />}></ButtonIcon>}
  onPageChange={handlePagination}
  pageRangeDisplayed={5}
  pageCount={Math.ceil(data.filteredProductsCount / data.resultPerPage)}
  previousLabel={<ButtonIcon Icon={<GrCaretPrevious />}></ButtonIcon>}
  renderOnZeroPageCount={null as any}
  pageClassName='pageCount'
  activeClassName='activePageCount'
  
/> </div>
}
  </Container>
    
    

    </>
  )
}

export default Products


function ButtonIcon ({Icon }:any){
 return (
  <IconButton colorScheme={'teal'} aria-label='Search database' icon={Icon } />
 )
}