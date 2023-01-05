import { Box } from '@chakra-ui/react'
import React from 'react'

const MainContent = ({children} : any) => {
  return (
    <Box
    transition={'200ms'}
    width={{
      base : '100vw',
      lg : 'calc(100vw - 300px)'
    }}
  className='ml-auto h-full'>{children}</Box>
  )
}

export default MainContent; 