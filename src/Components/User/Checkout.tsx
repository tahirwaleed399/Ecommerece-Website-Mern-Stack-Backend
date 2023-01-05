import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
} from "@chakra-ui/react";
import {  useFormik } from "formik";
import { Grid, GridItem } from "@chakra-ui/react";
import * as yup from "yup";
import React from "react";
import { useNavigate } from "react-router-dom";

const Checkout = ({setStep}:any) => {



  React.useEffect(()=>{
setStep(0);
  },[setStep])
  const navigate=useNavigate();
  const shippingSchema = yup.object().shape({
    phoneNo: yup
      .string()
      .required("Phone No is Required")
      .max(15, "Number cannot increase 15 Characters ")
      .min(9, "Number Must be atleast of 9 characters"),
    country: yup.string().required("Country is Required"),
    state: yup.string().required("State is Required"),
    city: yup.string().required("City is Required"),
    address: yup
      .string()
      .required("Address is Required")
      .min(10, "Address Should Atleast of 10 characters"),
    pinCode: yup
      .number()
      .required("Pin Code is Required")
      .test(
        "len",
        "Must be exactly 5 characters",
        (val: any) => val.toString().length === 5
      ),
  });

  // let [initialState , setInitialState] = useState<any>()
  const formik = useFormik({
    initialValues: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo') as any):{
      phoneNo: "",
      country: "pk",
      state: "",
      city: "",
      address: "",
      pinCode: 57000,
    },
    validationSchema: shippingSchema,
    validateOnChange: true,
    onSubmit: (values: any) => {
    localStorage.setItem('shippingInfo', JSON.stringify(values, null, 2));
    setStep(1);
    navigate('confirm');
    },
  });


  return (
    <>
      <Container maxW="container.lg">
        <form
          className="py-5 grid place-items-center"
          onSubmit={formik.handleSubmit}
        >
          <Heading className="mb-3" >
            {" "}
            Shipping Info
          </Heading>

          <Grid
            justifyContent={"center"}
            w="100%"
            templateColumns="repeat(auto-fill, minmax(270px , 400px))"
            gap={"20"}
          >
            <GridItem w="100%" h="10">
              <FormControl
                isRequired
                isInvalid={formik.errors.phoneNo ? true : false}
              >
                <FormLabel>Phone No</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="+92" />
                  <Input
                    name="phoneNo"
                    id="phoneNo"
                    onChange={formik.handleChange}
                    value={formik.values.phoneNo}
                    type="number"
                  />
                </InputGroup>
                
                { formik.errors.phoneNo &&
                  <FormErrorMessage>{formik.errors.phoneNo as any}</FormErrorMessage>
                }
              </FormControl>
            </GridItem>
            <GridItem w="100%" h="10">
              {" "}
              <FormControl
                isInvalid={formik.errors.country ? true : false}
                isRequired
              >
                <FormLabel>Country</FormLabel>
                <Select
                  name="country"
                  onChange={formik.handleChange}
                  value={formik.values.country}
                  placeholder="Select option"
                >
                  <option value="pk">Pakistan</option>
                  <option value="fr">France</option>
                </Select>
                { formik.errors.country &&
                  <FormErrorMessage>{formik.errors.country as any}</FormErrorMessage>
                }
              </FormControl>{" "}
            </GridItem>
            <GridItem w="100%" h="10">
              {" "}
              <FormControl
                isInvalid={formik.errors.state ? true : false}
                isRequired
              >
                <FormLabel>State</FormLabel>
                <Select
                  name="state"
                  onChange={formik.handleChange}
                  value={formik.values.state}
                  placeholder="Select option"
                >
                  <option value="punjab">Punjab</option>
                  <option value="sindh">Sindh</option>
                  <option value="balochistan">Balochistan</option>
                  <option value="khyberpakhtunkhaw">Khyber Pakhtunkhaw</option>
                  <option value="gilgitbaltistan">Gilgit Baltistan</option>
                </Select>
                { formik.errors.state &&
                  <FormErrorMessage>{formik.errors.state as any}</FormErrorMessage>
                }
              </FormControl>{" "}
            </GridItem>
            <GridItem w="100%" h="10">
              <FormControl
                isInvalid={formik.errors.city ? true : false}
                isRequired
              >
                <FormLabel>City</FormLabel>
                <Input
                  name="city"
                  onChange={formik.handleChange}
                  value={formik.values.city}
                  type="text"
                />
                   { formik.errors.city &&
                  <FormErrorMessage>{formik.errors.city as any}</FormErrorMessage>
                }
              </FormControl>
            </GridItem>
            <GridItem w="100%" h="10">
              <FormControl
                isInvalid={formik.errors.address ? true : false}
                isRequired
              >
                <FormLabel>Address</FormLabel>
                <Input
                  name="address"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  type="text"
                />
                   { formik.errors.address &&
                  <FormErrorMessage>{formik.errors.address as any}</FormErrorMessage>
                }
              </FormControl>
            </GridItem>
            <GridItem w="100%" h="10">
              {" "}
              <FormControl
                isInvalid={formik.errors.pinCode ? true : false}
                isRequired
              >
                <FormLabel>Postal Code</FormLabel>
                <Input
                  name="pinCode"
                  onChange={formik.handleChange}
                  value={formik.values.pinCode}
                  type="number"
                />
                   { formik.errors.pinCode &&
                  <FormErrorMessage>{formik.errors.pinCode as any}</FormErrorMessage>
                }
              </FormControl>
            </GridItem>
          </Grid>

          <Button
            className="my-20 "
            colorScheme={"pink"}
            size="lg"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Checkout;
