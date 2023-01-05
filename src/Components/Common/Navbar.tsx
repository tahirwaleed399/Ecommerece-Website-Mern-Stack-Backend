
import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
 
  useColorModeValue,
  Stack,
  HStack,
  useColorMode,
  Center,

} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../Redux/userSlice';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';

const NavLink = ({ children , to}: { children: ReactNode , to : string }) => (
 <Box px={2}
 py={1}
 rounded={'md'}
 _hover={{
   textDecoration: 'none',
   bg: useColorModeValue('gray.200', 'gray.700'),
 }}>
 <Link to={to}>
    {children}
  </Link>

 </Box>
);

export default function Nav( {onOpen} : any) {


let cartColor = useColorModeValue("brandYellow.600","brandYellow.100");
  const userState = useSelector((state:any)=>state.user);
const dispatch = useDispatch();
let cart = useSelector((state:any)=>state.cart)
  const { colorMode, toggleColorMode } = useColorMode();
  const Links= [{name :'Home ', to :'/'}, {name :'Products ', to :'/products'}];
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box display={{ base: 'none', md: 'flex' }}>
          <Link to={'/'}>  <img className='h-10' src="/images/logo.png" alt="My logo" /></Link>
          </Box> 
          
          <Box onClick={onOpen} display={{ base: 'block', md: 'none' }} fontSize='20px' cursor={'pointer'}>
          <GiHamburgerMenu></GiHamburgerMenu>
          </Box>
          <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link.name} to={link.to}>{link.name}</NavLink>
              ))}
            </HStack>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>



{
  
  userState.user &&

<>
<Box  alignSelf={'center'}  className='relative'>
<Link to={'/cart'}>
  {
    cart &&  <Box className='text-xs absolute -top-2 -right-2 bg-red-700 px-1 py-0 font-bold text-white rounded-full'>{cart.numOfItems}</Box>
  }

<Box className='cursor-pointer' as={AiOutlineShoppingCart} size="25px" color={cartColor} />
</Link>
</Box>
  <Menu>
  <MenuButton
    as={Button}
    rounded={'full'}
    variant={'link'}
    cursor={'pointer'}
    minW={0}>
    <Avatar
      size={'sm'}
      src={userState.user.avatar.url ? userState.user.avatar.url :'images/user.png'}
    />
  </MenuButton>
  <MenuList zIndex={100} alignItems={'center'}>
    <br />
    <Center>
      <Avatar
        size={'2xl'}
        src={userState.user.avatar.url ? userState.user.avatar.url :'images/user.png'}
      />
    </Center>
    <br />
    <Center>
      <p>{userState.user.name}</p>
    </Center>
    <br />
    <MenuDivider />

<Link to={'/me'}>
    <MenuItem>Account</MenuItem>
</Link>
    <MenuItem onClick={()=>dispatch(logoutUser() as any)}>Logout</MenuItem>
  </MenuList>
</Menu>
</>
}
{
  !userState.isAuthenticated &&
 <Link to={'/login'}> <Button
 colorScheme={"pink"}
>
 Login
</Button></Link>
}
      
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}