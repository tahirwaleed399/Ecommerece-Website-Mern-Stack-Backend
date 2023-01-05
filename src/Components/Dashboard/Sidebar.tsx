import {  Box, Divider, Flex,  IconButton, Image, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import {  Link, NavLink } from 'react-router-dom'
import {ImExit, ImProfile} from 'react-icons/im';
import { AiOutlineEdit, AiOutlineFolderAdd } from 'react-icons/ai';
import {CgArrowsExchangeAlt} from 'react-icons/cg'
import { logoutUser } from '../../Redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FaFirstOrder, FaProductHunt } from 'react-icons/fa';
import { BiStats } from 'react-icons/bi';

const userLinks = [
  {
    name :'Me',
    to :'/me',
    icon : <ImProfile/>
  }, {
    name :'Update Profile',
    to :'updateProfile',
    icon : <AiOutlineEdit/>
  },{
    name :'Change Password',
    to :'changePassword',
    icon : <CgArrowsExchangeAlt/>
  },{
    name :'To Reviews',
    to :'toReviews',
    icon : <CgArrowsExchangeAlt/>
  },
]

const adminLinks=[
  {
    name :'Statistics',
    to :'stats',
    icon : <BiStats/>
  }, {
    name :'Add Product',
    to :'addProduct',
    icon : <AiOutlineFolderAdd/>
  },  {
    name :'All Products',
    to :'allProducts',
    icon : <FaProductHunt/>
  },{
    name :'All Orders',
    to :'allOrders',
    icon : <FaFirstOrder/>
  },
]

const Sidebar = ({isOpen,onClose}:any) => {

  // const text = useColorModeValue("", "gray.700");
  
  const dispatch = useDispatch();
  const userState = useSelector((state:any)=>state.user);
  React.useEffect(()=>{
console.log(isOpen)
  },[isOpen])
  return (
    <>
   <Box onClick={onClose} display={isOpen ? 'block' : 'none'}>
   <div className="shadowBg">
      
      </div>
   </Box>
<Box boxShadow={'lg'}  transition={'500ms'} padding='20px' className='sidebar flex flex-col items-center justify-center fixed top-0 bottom-0'
transform={{
  base : isOpen === true ? '0'  :'translateX(-500px)',
  lg: 'translateX(0)',
}}
bg={isOpen ? 'white' : 'transparent'}
width='270px'
zIndex={20}
>

 

 <Link  to='/'>   <Image height={'70px'} src='images/logo.png'></Image></Link>

  <Divider></Divider>

<div className="links">

  
 
  {
userLinks && userLinks.map((link)=>{
  return (
    <> <NavLink end  className={({isActive})=>isActive ? 'activeBg':''} to={link.to} >
    <Box onClick={onClose} _hover={{
      background:'gray.300',
      transition : '500ms'
    }}  width={'100%'} margin='20px 0' padding='10px ' borderRadius='20px'>
        <Flex gap='15px' alignItems={'center'}>
        <IconButton size={'sm'}  color='white' colorScheme={'pink'} aria-label='Search database' icon={link.icon} />
        
       <Text fontWeight={'medium'} fontSize='15px'>{link.name}</Text>
    
        </Flex>
    </Box>
      </NavLink>
    
    </>
  )
})
  } 
  {userState.user.role ==='admin' &&
adminLinks && adminLinks.map((link)=>{
  return (
    <> <NavLink end  className={({isActive})=>isActive ? 'activeBg':''} to={link.to} >
    <Box onClick={onClose} _hover={{
      background:'gray.300',
      transition : '500ms'
    }}  width={'100%'} margin='20px 0' padding='10px ' borderRadius='20px'>
        <Flex gap='15px' alignItems={'center'}>
        <IconButton size={'sm'}  color='white' colorScheme={'pink'} aria-label='Search database' icon={link.icon} />
        
       <Text fontWeight={'medium'} fontSize='15px'>{link.name}</Text>
    
        </Flex>
    </Box>
      </NavLink>
    
    </>
  )
})
  }


<Box
onClick={()=>dispatch(logoutUser() as any)}
 _hover={{
  background:'gray.300',
  transition : '500ms'
}}  width={'100%'} margin='20px 0' padding='10px ' borderRadius='20px' cursor={'pointer'}>
    <Flex gap='15px' alignItems={'center'}>
    <IconButton size={'sm'}  colorScheme={'pink'} aria-label='Search database' icon={ <ImExit/>} />
    
   <Text fontWeight={'medium'} fontSize='15px'>
    Logout</Text>

    </Flex>
</Box>

</div>


</Box>

{/* </Box> */}



    </>
  )
}

export default Sidebar ;