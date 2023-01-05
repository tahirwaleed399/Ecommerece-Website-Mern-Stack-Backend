import { Box } from "@chakra-ui/react";
import React, { useCallback } from "react";
import Dropzone from "react-dropzone";
import { ImFilesEmpty } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {addImages, selectAllUploadImages, setImages} from '../../Redux/uploadImagesSlice';
const ImageDropZone = ({setProductImages , productImages}:any) => {
  const imageMimeType = /image\/(png|jpg|jpeg)/i;
  const dispatch = useDispatch();
  const uploadImages :any = useSelector(selectAllUploadImages);


  const onDrop = useCallback(async (acceptedFiles: any) => {


    let sortedFiles = acceptedFiles.filter( (file: File) => {

      if (file.type.match(imageMimeType)) {
        return file;
      } else {
        toast.error(`${file.name} is not Acceptable`);
      }
    });

   const filePromises =  sortedFiles.map((file : File)=>{
      const reader = new FileReader();
      return new Promise(resolve => {
        reader.onload = () => resolve({
id : uuidv4(),
src : reader.result
        });
        reader.readAsDataURL(file);
      });
    })
    const res = await Promise.all(filePromises);
    
    dispatch(addImages(res));
    


   
  }, []);

  return (
    <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />

            <Box
              h="200px"
              w="100%"
              border="1px dashed black my-10"
              maxW={"500px"}
              className="mx-auto my-6 grid place-items-center rounded-md cursor-pointer"
              bg="pink.400"
              color="white"
            >
              <Box className="grid place-items-center gap-2">
                <p>Drag And Drop Images Here Or Click To Select Files</p>
                <ImFilesEmpty className="text-lg "></ImFilesEmpty>
              </Box>
            </Box>
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default ImageDropZone;


function uuidv4() {
  // @ts-ignore
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}