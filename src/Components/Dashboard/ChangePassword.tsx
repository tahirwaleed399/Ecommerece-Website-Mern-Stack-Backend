import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { useState } from "react";
import * as yup from "yup";
import { useToast } from "@chakra-ui/react";
import { changeUserPassword } from "../../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ChangePassword() {
  const toast = useToast();
  const dispatch = useDispatch();
  const handleClick = () => setShow(!show);
  const [show, setShow] = useState(false);
  const userState = useSelector((state: any) => state.user);
  let [changePasswordData, setChangePasswordData] = useState<any>({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  let schema = yup.object().shape({
    confirmNewPassword: yup
      .string()
      .required("Confirm Password is Required")
      .oneOf([yup.ref("newPassword"), null], "New Passwords must match"),
    newPassword: yup
      .string()
      .required("New Password is Required")
      .min(8, "New Password Should At least of 8 characters"),
    oldPassword: yup
      .string()
      .required("Old Password is Required")
      .min(8, "Old Password Invalid"),
  });
  //   -----------------------------------------------------------------------------------------------------------------

  function registerFormSubmit() {
    schema
      .validate(changePasswordData)
      .then((res) => {
        dispatch(changeUserPassword(changePasswordData) as any);
      })
      .catch((err) => {
        toast({
          title: "Form Error",
          description: err.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  }

  function handleInputChange(event: any) {
    console.log(event.currentTarget.value, changePasswordData);
    setChangePasswordData({
      ...changePasswordData,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  //   -----------------------------------------------------------------------------------------------------------------
  return (
    <Stack maxW={'600px'}  className='mx-auto my-24' spacing={4}>
      <Heading>Change Password</Heading>
      <FormControl>
        <FormLabel>Old Password</FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<RiLockPasswordFill />}
          />
          <Input
            variant={"outline"}
            type={show ? "text" : "password"}
            placeholder="Password"
            name="oldPassword"
            onChange={handleInputChange as any}
            value={changePasswordData.oldPassword}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? <AiFillEyeInvisible /> : <AiFillEye />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel>New Password</FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<RiLockPasswordFill />}
          />
          <Input
            variant={"outline"}
            type={show ? "text" : "password"}
            placeholder="New Password"
            name="newPassword"
            onChange={handleInputChange as any}
            value={changePasswordData.newPassword}
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
            value={changePasswordData.confirmNewPassword}
            name="confirmNewPassword"
          />
          <InputRightElement width="4.5rem">
            <Button type="submit" h="1.75rem" size="sm" onClick={handleClick}>
              {show ? <AiFillEyeInvisible /> : <AiFillEye />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

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
