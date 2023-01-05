import { Button, Input, Stack, useColorModeValue,useToast } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom';
 

const Search = () => {
    let navigate = useNavigate();
    const toast = useToast()
    function searchThis(e:any){
  if(!(keyword.length === 0)){
navigate('/products/'+keyword);
  }else{
    toast({
        title: 'Warning',
        description: "Please Write Something to Search",
        status: 'warning',
        duration: 2000,
        isClosable: true,
      })
  }
    
        
    }
    let [keyword, setKeyword] = React.useState<string>('');
  return (
    <>
      <Stack    width={'90%'}
          maxWidth={'500px'} spacing={4} direction={{ base: 'column', md: 'row' }} w={'full'}>
          <Input
          value={keyword}
          onChange={(e)=>setKeyword(e.currentTarget.value)}
            type={'text'}
            placeholder={'Search Anything'}
            color={'black'}
            bg={ useColorModeValue('whiteAlpha.700', 'whiteAlpha.700')}
            rounded={'full'}
            border={0}
            _focus={{
              bg: useColorModeValue('whiteAlpha.700', 'whiteAlpha.700'),
              outline: 'none',
            }}
          />
          <Button
          onClick={searchThis}
            bg={'teal.400'}
            rounded={'full'}
            color={'white'}
            flex={'1 0 auto'}
            _hover={{ bg: 'teal.500' }}
            _focus={{ bg: 'teal.500' }}>
         Search
         
          </Button>
        </Stack>
    
    </>
  )
}

export default Search