import { Box, Heading, Image } from '@chakra-ui/react'
import React from 'react'
import GoBack from './GoBack'

const PageNotFound = () => {
  return (
      <Box className='h-full w-full grid place-items-center'>
<Box className='flex flex-col items-center justify-center'>
    <Box className='self-start'>
    <GoBack></GoBack>
    </Box>
    <Heading className='my-3'>404 Error</Heading>
    
<Image src='/images/404.svg'></Image>

</Box>
</Box>

  )
}

export default PageNotFound