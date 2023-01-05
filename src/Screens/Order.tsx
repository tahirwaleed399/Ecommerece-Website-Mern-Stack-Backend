import React from 'react'
import { Stepper } from 'react-form-stepper';
import Checkout from '../Components/User/Checkout';
import { Outlet } from 'react-router-dom'

const Order = ({step , setStep}:any) => {
   
  return (
    <>

    <Stepper
      steps={[{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]}
      activeStep={step}
    />
        {/* <Checkout setStep={setStep}></Checkout> */}
        <Outlet></Outlet>
    </>
  )
}

export default Order