import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Box,
  } from '@chakra-ui/react'
  import React from 'react'
import { Link } from 'react-router-dom'
  

const links = [
    {
        name : 'Home',
        to: '/'
    }, {
        name : 'Products',
        to: '/products'
    }, {
        name : 'About',
        to: '/'
    }, {
        name : 'Contact',
        to: '/'
    },
]


  const HomeNav = ({onClose , isOpen} : any) => {
    return (
      <div> <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth='1px'>
        <Box onClick={onClose}>
          <Link to={'/'}>  <img className='h-10' src="/images/logo.png" alt="My logo" /></Link>
          </Box> 
        </DrawerHeader>
        <DrawerBody>
        <ul>
            {
                links.map((link:any)=><>
                <li>
                <Link to={link.to}>
                    <Box w={'full'} padding='10px' onClick={onClose} rounded='sm' _hover={
                        {
                            backgroundColor : 'gray.200'
                        }
                    }> 
                        {link.name}
                    </Box>
                    </Link>
                </li>
                </>)
            }
        </ul>
        </DrawerBody>
      </DrawerContent>
    </Drawer></div>
    )
  }
  
  export default HomeNav