import { Box, Image } from '@chakra-ui/react';
import React from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import Nestable from 'react-nestable';
import 'react-nestable/dist/styles/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteImage, selectAllUploadImages, setImages,updateImageData } from '../../Redux/uploadImagesSlice';


const ImagesPreviewer = () => {
  const renderImage = ({ item : image }:any) => <ImageBox id={image.id} src={image.src}></ImageBox>;
  const uploadImages = useSelector(selectAllUploadImages);
  const dispatch = useDispatch();
  function handleChange(e:any){
    dispatch(setImages(e.items))
  }
 
  return (
    <div>
       <Nestable
    items={uploadImages}
    renderItem={renderImage}
    maxDepth={0}
    onChange={handleChange}
  />
    
    </div>
  )
}

export default ImagesPreviewer;


function ImageBox({src,id}:{src:string,id:string}){
  const dispatch = useDispatch();
  function handleImageUpdate(e:any){
 
    console.log(e.target.files)

    const reader = new FileReader();


    reader.onload = ()=>{


      console.log(id)
      dispatch(updateImageData({id , src : reader.result}))
    }

    reader.readAsDataURL(e.target.files[0]);
      }
    
return (<>
<Box className='imgBox  h-40 w-40'>

<Image className='absolute top-0 left-0 h-full w-full' src={src}></Image>
<input type="file"  name={`imgEdit`+id} id={`imgEdit`+id} className='hidden' onChange={handleImageUpdate}/>
<label htmlFor={`imgEdit`+id}><div className="imgBtn Edit">
  <AiFillEdit/>
</div></label>
<div className="imgBtn Delete" onClick={()=>dispatch(deleteImage(id))}>
  <AiFillDelete/>
</div>
</Box>
</>)

} 