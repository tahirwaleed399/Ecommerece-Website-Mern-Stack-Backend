import { Box, Button, Heading, HStack, Image, Text, Textarea, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import StarRatings from 'react-star-ratings'
import { useAddReviewMutation } from '../../Redux/OtherApi/OtherApi'
import { getUser } from '../../Redux/userSlice'
// import { useAddReviewMutaion } from '../../Redux/ProductsApi/ProductsApi'
import Loader from '../Common/Loader'

const AddReview = () => {
    let {user}  = useSelector((state :any)=> state.user)
  return (
    <div className='my-20'>
<Heading className='my-5 '>To Review Products : </Heading>
{
    !user.isLoading ? <>

{

user.toReview.length === 0 ? <>
<Box className='grid place-items-center'>
<Heading className='text-center'> No Item To Review</Heading>
<Link to={'/products'}><Button  colorScheme={'yellow'}>Go Shop </Button></Link>
</Box>
 </>:user.toReview.map((product : any , index:number )=>{
    return (<>
    
    <ReviewForm product= {product} index={index} ></ReviewForm>
    
    </>)
})


}
    </> : <Loader></Loader>
}

    </div>
  )
}

export default AddReview


function ReviewForm({product , index}:any){
    let [comment, setComment] = React.useState('')
    let [addReview , reviewState]= useAddReviewMutation()
let dispatch = useDispatch()
let [rating , setRating ] = useState<number>(0);
let handleInputChange = (e : any) => {
    let inputValue = e.target.value
    setComment(inputValue)
  }

  function handleAddReview (e:any){
    console.log({rating , comment , productId:product.productId })
    addReview({rating , comment , productId:product.productId })
    setTimeout(()=>{
        dispatch(getUser() as any)
    },2000)
  }
    return (<>
     <Box  boxShadow={'md'} w='100%' maxW='400px'  m='50px auto' >

        <Image boxSize={'sm'}  w='100%' src={product.image}></Image>
        <VStack align='flex-start'>
            <Heading  size={'sm'}> {product.name}</Heading>
            <Text className='my-3 '>Rs : {product.price}</Text>
        </VStack>

      {/* @ts-ignore */}
    <StarRatings  rating={rating} changeRating={setRating}  starDimension="30px" starSpacing='2px' starRatedColor="pink"> </StarRatings>
    <Textarea
    className='my-5 '
        value={comment}
        onChange={handleInputChange}
        placeholder='Tell us About Product'
        size='sm'
        
      />


      <Button w='full' colorScheme={'pink'} onClick={handleAddReview} >Add Review</Button>
     </Box>
    </>)
}
