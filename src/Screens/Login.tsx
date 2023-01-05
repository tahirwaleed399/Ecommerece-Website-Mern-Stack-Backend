import {

  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import "./Css/login.scss";

import LoginForm from "../Components/Common/LoginForm";
import RegisterForm from "../Components/Common/RegisterForm";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


 






const Login = () => {
  const navigate =useNavigate();
  const userState = useSelector((state:any)=>state.user);
  React.useEffect(()=>{
    if(userState.isAuthenticated){
      navigate('/')
    }
  },[userState, navigate]);
  
  return (
    <div className="loginContainer">
      <Tabs isFitted variant="soft-rounded" colorScheme={"pink"}>
        <TabList mb="1em">
          <Tab>Login</Tab>
          <Tab>Register</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <LoginForm></LoginForm>
          </TabPanel>
          <TabPanel>
            <RegisterForm ></RegisterForm>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Login;










































// function isEmail(emailAdress:string){
//     let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//   if (emailAdress.match(regex)) 
//     return true; 

//    else 
//     return false; 
// }