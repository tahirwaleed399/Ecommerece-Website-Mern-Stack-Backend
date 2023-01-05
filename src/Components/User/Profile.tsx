import { Box, Flex, HStack, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Outlet } from 'react-router-dom'
import MainContent from '../Dashboard/MainContent'
import Sidebar from '../Dashboard/Sidebar'
 
const Profile = () => {

  let {onOpen , onClose , isOpen} = useDisclosure()
  return (
    <div>
      {/* <Flex>   */}

      <div className="relative">
        <Sidebar isOpen={isOpen} onClose={onClose}></Sidebar>

        <Box margin={'20px 10px'} onClick={onOpen} display={{ base: 'block', md: 'none' }}>

        <GiHamburgerMenu   className='cursor-pointer' style={{fontSize :'20px'}}></GiHamburgerMenu>
        </Box>
        <MainContent>
            <Outlet></Outlet>
        </MainContent>
      </div>
        
        
        {/* </Flex> */}



    </div>
  )
}

export default Profile