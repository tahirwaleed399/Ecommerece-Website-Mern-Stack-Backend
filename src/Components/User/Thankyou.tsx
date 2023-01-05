import { Box, Heading, useColorModeValue, VStack } from '@chakra-ui/react'
import React from 'react'
import {TiTick} from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
const Thankyou = ({setStep} : any) => {
const navigate= useNavigate();
    React.useEffect(()=>{

        setStep(2);
        setTimeout(()=>{
            navigate('/');
        },3000)
    },[navigate, setStep])

  return (
    <div>


<Box w='100%' maxW={'600px'} className='grid place-items-center rounded mx-auto my-10' padding={'50px'} bg={useColorModeValue('white', 'black')}>


<VStack>
<Box borderRadius={'full'} h={'100px'} w='100px' className='bg-green-600 grid place-items-center'>
<TiTick className='text-6xl text-white'></TiTick>
</Box>
<Heading size={'md'}>Thanks For Ordering At Ahmad Mobilez</Heading>
<p>Your Order Id is 43423423424323443</p>
</VStack>

</Box>


    </div>
  )
}

export default Thankyou