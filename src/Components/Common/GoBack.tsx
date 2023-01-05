import { Box, IconButton } from '@chakra-ui/react'
import React from 'react'
import {BiArrowBack} from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
const GoBack = () => {
  const navigate = useNavigate();
  return (
<Box onClick={() => navigate(-1)}>
<IconButton
  variant='outline'
  colorScheme='teal'
  aria-label='Call Sage'
  fontSize='20px'
  w='60px'
  m='1'
  icon={<BiArrowBack />}
/>
</Box>
  )
}

export default GoBack