import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ProductInterface } from "../../Interfaces/Product";
import { useDeleteProductMutation, useGetAdminProductsQuery } from "../../Redux/ProductsApi/ProductsApi";

const AllProducts = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let { data } = useGetAdminProductsQuery();
  let [ deleteProduct , deleteState ] = useDeleteProductMutation();

  let [modalData, setModalData] = useState({
    name: "Charger",
    _id: "5452q",
    src: "fdfd",
  });
  function handleDelete(){
    console.log(deleteProduct)
    console.log(deleteState)
    deleteProduct(modalData._id);
  }

  React.useEffect(()=>{
    toast.dismiss();
    if(deleteState.isError){
        toast.error(deleteState.error)
    }else if(deleteState.isSuccess){

        onClose()
        toast.success('Product Deleted Success')
    }
  },[deleteState , onClose])
  return (
    <>
     <Box className="my-20">
      <Heading className='text-center my-4'>All Products</Heading>
     <TableContainer>
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>Product</Th>
              <Th>Name</Th>
              <Th isNumeric>Price</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            { data && data.products.length > 0 && data.products.map((product: ProductInterface) => {
              return (
                <>
                  <Tr>
                    <Td>
                      <Box h="60px" w="60px">
                        <Image
                          src={
                            product.images.length > 0
                              ? product.images[0].url
                              : "https://res.cloudinary.com/ahmad-mobilez/image/upload/v1660512585/Avatars/yyk7d3ybwj6ts63alzua.jpg"
                          }
                        ></Image>
                      </Box>
                    </Td>
                    <Td>{product.name}</Td>
                    <Td isNumeric>{product.price}</Td>
                    <Td>
                      <Link to={`/me/updateProduct/${product._id}`}><IconButton
                      className="mx-2"
                        aria-label="Search database"
                        icon={<AiFillEdit />}
                        colorScheme="green"
                        
                      /></Link>
                      <IconButton
                      className="mx-2"
                        aria-label="Search database"
                        icon={<AiFillDelete />}
                        colorScheme="red"
                        onClick={() => {
                          setModalData({
                            name: product.name,
                            _id: product._id,
                            src:
                              product.images.length > 0
                                ? product.images[0].url
                                : "https://res.cloudinary.com/ahmad-mobilez/image/upload/v1660512585/Avatars/yyk7d3ybwj6ts63alzua.jpg",
                          });
                          onOpen()
                        }}
                      />
                    </Td>
                  </Tr>
                </>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>

     </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Product Name : {modalData.name}</p>
            <Flex>
              <p>Product Image : </p>
              <Box h="30px" w="30px">
                <Image m='0 10px' src={modalData.src}></Image>
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="red" variant="ghost" onClick={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AllProducts;
