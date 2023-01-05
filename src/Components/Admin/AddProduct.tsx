import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import categories from "../../utils/categories";
import ImageDropZone from "./ImageDropZone";
import ImagesPreviewer from "./ImagesPreviewer";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  clearAll,
  selectAllUploadImages,
  setImages,
} from "../../Redux/uploadImagesSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useAddProductMutation,
  useUpdateProductMutation,
} from "../../Redux/ProductsApi/ProductsApi";
import Loader from "../Common/Loader";
import { useNavigate } from "react-router-dom";
import { ProductInterface } from "../../Interfaces/Product";

const AddProduct = ({ product }: { product: ProductInterface | null }) => {
  // Description Text
  const [convertedText, setConvertedText] = useState(
    product ? product.description : " "
  );
  // geting uploaded Images REference from redux
  const uploadImages = useSelector(selectAllUploadImages);
  // Array that makes a copy of update product images before updating product
  let [previousImages, setPreviousImages] = useState<any[]>([]);
  let [addProduct, addState] = useAddProductMutation();
  let [updateProduct, updateState] = useUpdateProductMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // using useEffect tto Show Toasts
  React.useEffect(() => {
    if (product) {
      setPreviousImages(product.images);

      let tempData = product.images.map((image) => {
        return {
          id: uuidv4(),
          src: image.url,
          public_id: image.public_id,
        };
      });

      dispatch(setImages(tempData));
    }

    toast.dismiss();
    if (addState.isSuccess) {
      toast.success("Product Added ");
      dispatch(clearAll());
      navigate("/me");
    } else if (addState.isError) {
      toast.error(addState.error);
    } else if (addState.isLoading) {
      toast.loading("Adding Product Please Wait A Bit ");
    }
    if (updateState.isSuccess) {
      toast.success("Product Updated ");
      dispatch(clearAll());
      navigate("/me/allProducts");
    } else if (updateState.isError) {
      toast.error(updateState.error);
    } else if (updateState.isLoading) {
      toast.loading("Updating Product Please Wait A Bit ");
    }
  }, [addState, dispatch, navigate, product, updateState]);

  // Form Schema to  Validate
  const addProductSchema = yup.object().shape({
    name: yup
      .string()
      .required("name is required")
      .min(3, "Name should atleast of 3 characters"),
    category: yup.string().required("Category is Required"),
    price: yup.number().required("Price is Required"),
    stock: yup.number().required("Stock is Required"),
  });

  // adding formik hook for validation
  const formik = useFormik({
    initialValues: product
      ? {
          name: product.name,
          category: product.category,
          price: product.price,
          stock: product.stock,
        }
      : {
          name: "",
          category: "",
          price: 100,
          stock: 1,
        },
    validationSchema: addProductSchema,
    validateOnChange: true,
    onSubmit: (values: any) => {
      // validation That cannot be done with formik
      if (uploadImages.length < 1) {
        toast.error("Select At Lease 1 Image ");
        return;
      }
      if (convertedText.length < 10) {
        toast.error("Write Something in Description Please");
        return;
      }
      const { name, category, stock, price } = values;

      if (product) {
        updateProduct({
          name,
          category,
          stock,
          price,
          description: convertedText,
          images: uploadImages,
          previousImages: previousImages,
          id: product._id,
        });
      } else {
        addProduct({
          name,
          category,
          stock,
          price,
          description: convertedText,
          images: uploadImages,
        });
      }
    },
  });

  return (
    <div>
      <Box className="py-20 px-2 w-full mx-auto" maxW={"800px"}>
        <Heading className="text-center my-3 ">
          {product ? "Update Product" : "Add Product"}
        </Heading>
        <form
          onSubmit={(e) => {
            formik.handleSubmit(e);
          }}
        >
          <FormControl isRequired isInvalid={formik.errors.name ? true : false}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              id="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />

            {formik.errors.name && (
              <FormErrorMessage>{formik.errors.name as any}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            isRequired
            isInvalid={formik.errors.category ? true : false}
          >
            <FormLabel>Category</FormLabel>
            <Select
              placeholder="Select option"
              name="category"
              id="category"
              onChange={formik.handleChange}
              value={formik.values.category}
            >
              {categories.map((category) => (
                <option value={category.toLowerCase()}>
                  {category.toUpperCase()}
                </option>
              ))}
            </Select>

            {formik.errors.category && (
              <FormErrorMessage>
                {formik.errors.category as any}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            isRequired
            isInvalid={formik.errors.price ? true : false}
          >
            <FormLabel>Price</FormLabel>

            <Input
              name="price"
              id="price"
              onChange={formik.handleChange}
              value={formik.values.price}
              type="number"
            />

            {formik.errors.price && (
              <FormErrorMessage>{formik.errors.price as any}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl
            isRequired
            isInvalid={formik.errors.stock ? true : false}
          >
            <FormLabel>Stock</FormLabel>

            <Input
              name="stock"
              id="stock"
              onChange={formik.handleChange}
              value={formik.values.stock}
              type="number"
            />

            {formik.errors.stock && (
              <FormErrorMessage>{formik.errors.stock as any}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            isRequired
            isInvalid={convertedText.length < 10 ? true : false}
          >
            <FormLabel>Description</FormLabel>
            <ReactQuill
              theme="snow"
              onChange={setConvertedText}
              value={convertedText}
            />

            {convertedText.length < 10 && (
              <FormErrorMessage>
                Desription Should Atleast of 10 Characters
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired className="my-3">
            <FormLabel>Images</FormLabel>
            <ImageDropZone></ImageDropZone>
            <ImagesPreviewer></ImagesPreviewer>
          </FormControl>

          <Button colorScheme="pink" type="submit" w={"100%"} className="my-4">
            {product ? "Update Product" : "Add Product"}
          </Button>
        </form>
      </Box>

      {(addState.isLoading || updateState.isLoading) && (
        <div className="shadow">
          <Loader></Loader>
        </div>
      )}
    </div>
  );
};

export default AddProduct;

function uuidv4() {
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
