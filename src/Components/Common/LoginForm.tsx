import { Button, Center, FormControl, FormLabel, Input, InputGroup, InputLeftElement, InputRightElement, Stack, useToast } from "@chakra-ui/react";
import { AiFillEye, AiFillEyeInvisible, AiTwotoneMail } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import React, { useState } from 'react';
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Redux/userSlice";


export default function LoginForm() {
  const toast = useToast()
  const dispatch = useDispatch();


    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);
    const userState = useSelector((state:any)=>state.user);

    let schema = yup.object().shape({

      password : yup.string().required('Password is Required'),
      email: yup.string().required('Email is Required').email('Input Must be an Email'),
    
    });
    let [loginFormData, setLoginFormData] = useState<any>({
      email: "",
      password: ""
  });



  function handleInputChange(event: any) {

    
    setLoginFormData({
      ...loginFormData,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }
  
  function handleLogin(){
    schema.validate(loginFormData).then((res)=>{
      dispatch(loginUser(res) as any);
      
      
      
    }).catch((err)=>{
     toast({
       title: 'Form Error',
       description: err.message,
       status: 'error',
       duration: 2000,
       isClosable: true,
     })
      
    })
  }







    return (
      <Stack spacing={4}>
        
<FormControl>
  <FormLabel>Email</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<AiTwotoneMail />} />
          <Input name='email' value={loginFormData.email} variant={"outline"} type="email" placeholder="Email"  onChange={handleInputChange as any} />
        </InputGroup>
        </FormControl>
        <FormControl>
  <FormLabel>Password</FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<RiLockPasswordFill />}
          />
          <Input
          name='password'
                value={loginFormData.password}
            variant={"outline"}
            type={show ? "text" : "password"}
            placeholder="Password"
            onChange={handleInputChange as any}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? <AiFillEyeInvisible /> : <AiFillEye />}
            </Button>
          </InputRightElement>
        </InputGroup>
        </FormControl>
        <Center>
        <Button
        isLoading={userState.isLoading}
          onClick={handleLogin}
          width={"80px"}
          colorScheme={"pink"}
        >
          Submit
        </Button>
        </Center>
      </Stack>
    );
  }
  

