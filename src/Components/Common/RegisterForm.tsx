import {
  Avatar,
  Button,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { AiFillEye, AiFillEyeInvisible, AiTwotoneMail } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { FaUserAlt } from "react-icons/fa";
import * as yup from 'yup';
import { useToast } from '@chakra-ui/react'
import { registerUser } from "../../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function RegisterForm() {

  const toast = useToast();
  const dispatch = useDispatch();
  const handleClick = () => setShow(!show);
  const [show, setShow] = useState(false);
  const userState = useSelector((state:any)=>state.user);
  let [registerFormData, setRegisterFormData] = useState<any>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
});
let schema = yup.object().shape({
  avatar: yup.string().notRequired(),
  confirmPassword: yup.string().required('Confirm Password is Required')
  .oneOf([yup.ref('password'), null], 'Passwords must match'),
  password : yup.string().required('Password is Required').min(8, 'Password Should At least of 8 characters'),
  email: yup.string().required('Email is Required').email('Input Must be an Email'),
  name: yup.string().required('Name is Required').min(3,'Name Should be At least of 3 characters'),

});
//   -----------------------------------------------------------------------------------------------------------------
 
  
  function registerFormSubmit() {
     schema.validate(registerFormData).then((res)=>{
      dispatch(registerUser(registerFormData) as any);
      
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


  const handleProfileDrop = (acceptedFiles: any[]) => {
    const reader = new FileReader();
    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
        const binaryStr = reader.result;
        
        setRegisterFormData({ ...registerFormData, avatar: binaryStr });
    };
    
    reader.readAsDataURL(acceptedFiles[0]);
};

function handleInputChange(event: any) {
  setRegisterFormData({
    ...registerFormData,
    [event.currentTarget.name]: event.currentTarget.value,
  });
}



//   -----------------------------------------------------------------------------------------------------------------
  return (
    <Stack spacing={4}>

<FormControl>
  <FormLabel>Name</FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<FaUserAlt />} />
        <Input
          value={registerFormData.name}
          variant={"outline"}
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleInputChange as any}
        />
      </InputGroup>
</FormControl>

<FormControl>
  <FormLabel>Email address</FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<AiTwotoneMail />} />
        <Input
          variant={"outline"}
          type="email"
          placeholder="Email"
          name="email"
          value={registerFormData.email}
          onChange={handleInputChange as any}
        />
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
          variant={"outline"}
          type={show ? "text" : "password"}
          placeholder="Password"
          name="password"
          onChange={handleInputChange as any}
          value={registerFormData.password}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? <AiFillEyeInvisible /> : <AiFillEye />}
          </Button>
        </InputRightElement>
      </InputGroup>


      </FormControl>
      <FormControl>
  <FormLabel>Confirm Password</FormLabel>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<RiLockPasswordFill />}
        />
        <Input
          variant={"outline"}
          type={show ? "text" : "password"}
          placeholder="Confirm Password"
          onChange={handleInputChange as any}
          value={registerFormData.confirmPassword}
          name="confirmPassword"
        />
        <InputRightElement width="4.5rem">
          <Button type="submit" h="1.75rem" size="sm" onClick={handleClick}>
            {show ? <AiFillEyeInvisible /> : <AiFillEye />}
          </Button>
        </InputRightElement>
      </InputGroup>
      </FormControl>

      <HStack>
        <Dropzone
          maxFiles={1}
          maxSize={10000000}
          accept={{
            "image/png": [".png"],
            "image/jpg": [".jpg"],
            "image/jpeg": [".jpeg"],
            "image/gif": [".gif"],
          }}
          onDrop={handleProfileDrop}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Button colorScheme={"teal"} className="fileInput my-3">
                  Choose Profile Image Or Drop Here
                </Button>
              </div>
            </section>
          )}
        </Dropzone>
        <Avatar className="mx-3" src={registerFormData.avatar}>
          {" "}
        </Avatar>
      </HStack>
      <Center>
        <Button
        isLoading={userState.isLoading}
          onClick={registerFormSubmit}
          width={"80px"}
          colorScheme={"pink"}
        >
          Submit
        </Button>
      </Center>
    </Stack>
  );
}




