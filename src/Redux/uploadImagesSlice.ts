import {
  createEntityAdapter,
  createSlice,
  configureStore,
  current,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";

type Image = { id: string; src: string ; };

const uploadImageAdapter = createEntityAdapter<Image>({
  selectId: (image) => image.id,
});

const uploadImageSlice = createSlice({
  name: "books",
  initialState: uploadImageAdapter.getInitialState(),
  reducers: {
    addImages: (state, action) => {
      uploadImageAdapter.addMany(state, action.payload);
      if (Object.keys(current(state.entities)).length > 8) {
        let filteredArr = Object.keys(current(state.entities)).filter(
          (element, index) => {
            if (!(index > 7)) {
              return element;
            }
          }
        );
        let tempObj = { ...current(state.entities) };
        console.log(tempObj);
        uploadImageAdapter.setAll(state, []);
        filteredArr.forEach((element) => {
          uploadImageAdapter.addOne(state, tempObj[element] as Image);
        });
        toast.info("Only 8 Images Can Added");
      }
    },
    setImages: uploadImageAdapter.setAll,



    deleteImage: uploadImageAdapter.removeOne,


    updateImageData: (state, action) => {
      uploadImageAdapter.updateOne(state, {
        id: action.payload.id,
        changes: {
          ...action.payload,
        },
      });
    },

    clearAll : (state)=>{
      uploadImageAdapter.setAll(state, []);

    }




  },
});

export const { selectAll: selectAllUploadImages } =
  uploadImageAdapter.getSelectors((state: any) => state.uploadImages);
export const { addImages, setImages, deleteImage, updateImageData ,clearAll} =
  uploadImageSlice.actions;
export default uploadImageSlice.reducer;
