import {
  Avatar,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,

  Stack,
} from "@chakra-ui/react";
import {  AiTwotoneMail } from "react-icons/ai";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { FaUserAlt } from "react-icons/fa";
import * as yup from 'yup';
import { useToast } from '@chakra-ui/react'
import {  updateUser } from "../../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function UpdateProfile( ) {
const user = useSelector((state:any)=>state.user.user);
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => setShow(!show);
  const [show, setShow] = useState(false);
  const userState = useSelector((state:any)=>state.user);
  let [updateProfileData, setUpdateProfileData] = useState<any>({
    name: user.name,
    email: user.email,
    avatar: user.avatar.url,
});
let schema = yup.object().shape({
  avatar: yup.string().notRequired(),
  email: yup.string().required('Email is Required').email('Input Must be an Email'),
  name: yup.string().required('Name is Required').min(3,'Name Should be At least of 3 characters'),

});
//   -----------------------------------------------------------------------------------------------------------------
 
  
  function updateProfile() {
     schema.validate(updateProfileData).then((res)=>{
      dispatch(updateUser(updateProfileData)as any);
      navigate('/me')
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
        
        setUpdateProfileData({ ...updateProfileData, avatar: binaryStr });
    };
    
    reader.readAsDataURL(acceptedFiles[0]);
};

function handleInputChange(event: any) {
  setUpdateProfileData({
    ...updateProfileData,
    [event.currentTarget.name]: event.currentTarget.value,
  });
}



//   -----------------------------------------------------------------------------------------------------------------
  return (
    <Stack maxW={'600px'}  className='mx-auto my-24' spacing={4}>
<Heading>Update Profile</Heading>
<FormControl>
  <FormLabel>Name</FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<FaUserAlt />} />
        <Input
          value={updateProfileData.name}
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
          value={updateProfileData.email}
          onChange={handleInputChange as any}
        />
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
        <Avatar className="mx-3" src={updateProfileData.avatar}>
          {" "}
        </Avatar>
      </HStack>
      <Center>
        <Button
        isLoading={userState.isLoading}
          onClick={updateProfile}
          width={"80px"}
          colorScheme={"pink"}
        >
          Update
        </Button>
      </Center>
    </Stack>
  );
}




