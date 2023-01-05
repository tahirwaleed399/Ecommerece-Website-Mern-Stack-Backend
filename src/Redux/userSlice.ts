import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {  toast } from 'react-toastify';

const options = {
  headers: {"content-type": "application/json"},
  withCredentials : true ,
  credentials : 'include'

}
let initialState = {
    isLoading : false ,
    isError : false ,
    isAuthenticated: null ,
    user : null ,
    error : null,
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
     
    },
    extraReducers: builder => {
  builder.addCase(registerUser.pending ,(state , action )=>{
    setState(state , true , false , false , null , null);

  }).addCase(registerUser.fulfilled, (state , action)=>{
    setState(state , false , false , true , action.payload , null);

  }).addCase(registerUser.rejected, (state , action )=>{
    setState(state , false , true , false , null , action.payload as any );
  }
    ).addCase(loginUser.pending ,(state , action )=>{
      setState(state , true , true , null  , null , null);
  
    }).addCase(loginUser.fulfilled, (state , action)=>{
      setState(state , false , false , true , action.payload , null);
  
    }).addCase(loginUser.rejected, (state , action )=>{
      setState(state , false , true , false , null , action.payload as any );
    }
      ).addCase(getUser.pending ,(state , action )=>{
      setState(state , true , true , null , null , null);
  
    }).addCase(getUser.fulfilled, (state , action)=>{
      setState(state , false , false , true , action.payload , null);
  
    }).addCase(getUser.rejected, (state , action )=>{
      setState(state , false , true , false , null , action.payload as any );
    }
      ).addCase(logoutUser.fulfilled, (state , action)=>{
      setState(state , false , false , false , null , null);
  
    }).addCase(logoutUser.rejected, (state , action )=>{
      console.log('Logout Cancelled due to' + action.payload);
      
    }
      ).addCase(updateUser.pending ,(state , action )=>{
        // setState(state , true , false , true , state.user , null);
        state.isLoading= true ;
    
      }).addCase(updateUser.fulfilled, (state , action)=>{
        state.isLoading= false ;
        state.user = action.payload;

  
    }).addCase(updateUser.rejected, (state , action )=>{
      state.isLoading= false ;
      console.log('updateUser Cancelled due to' + action.payload);
      
    }
      ).addCase(changeUserPassword.pending ,(state , action )=>{
    state.isLoading = true ;
      }).addCase(changeUserPassword.fulfilled, (state , action)=>{
    state.isLoading = false ;
        

  
    }).addCase(changeUserPassword.rejected, (state , action )=>{
      state.isLoading = false ;
      state.isError= true ;
      state.error =  action.payload as any ;

      console.log('updatePassword Cancelled due to' + action.payload);
      
    }
      )



      }
  })

  export const registerUser  = createAsyncThunk('users/Register', async (user:any, thunkAPI)=>{
try{

  let res:any = await axios.post('http://localhost:5000/api/v1/register',user, options);

  console.log(res);
toast.success('🎉 Congratulations You Are Registered')
return res.data.user;
}
catch(err:any){
 
toast.error(err['response'].data.message)
return thunkAPI.rejectWithValue(err['response'].data.message)  ;
}

     
  })
 export const loginUser  = createAsyncThunk('users/Login', async (loginData : any, thunkAPI)=>{
try{

  let res:any = await axios.post('http://localhost:5000/api/v1/login',loginData, options);

  console.log(res);

toast.success('🎉 Congratulations You Are Logged In')
return res.data.user;
}
catch(err:any){
 
toast.error(err['response'].data.message)
return thunkAPI.rejectWithValue(err['response'].data.message)  ;
}

     
  }); 
  
  
  export const getUser  = createAsyncThunk('users/Get', async (type , thunkAPI)=>{
try{

  let res:any = await axios.get('http://localhost:5000/api/v1/me',{...options });

  console.log(res);
return res.data.user;
}
catch(err:any){
 
// toast.error(err['response'].data.message)
return thunkAPI.rejectWithValue(err['response'].data.message)  ;
}

     
  });
  
  export const logoutUser  = createAsyncThunk('users/Logout', async (type , thunkAPI)=>{
try{

  let res = await axios.get('http://localhost:5000/api/v1/logout',{...options });

  console.log(res);
toast.success('Success Logout');
return res;
}
catch(err:any){
 
toast.error(err['response'].data.message)
return thunkAPI.rejectWithValue(err['response'].data.message)  ;
}

     
  });
  
  
  export const updateUser  = createAsyncThunk('users/Update', async (newData :{name : string , email : string , avatar : string } , thunkAPI)=>{
try{

  let res:any = await axios.put('http://localhost:5000/api/v1/me/update',newData,{...options });

toast.success('Profile Updated ');
return res.data.user;
}
catch(err:any){
 
toast.error(err['response'].data.message)
return thunkAPI.rejectWithValue(err['response'].data.message)  ;
}

     
  });
  
  
  export const changeUserPassword  = createAsyncThunk('users/UpdatePassword', async (passwords:{oldPassword : string , newPassword : string , confirmNewPassword:string} , thunkAPI)=>{
try{

  let res = await axios.post('http://localhost:5000/api/v1/password/update',JSON.stringify(passwords),{...options });

toast.success('Password Changed Success');
return res;
}
catch(err:any){
 
toast.error(err['response'].data.message)
return thunkAPI.rejectWithValue(err['response'].data.message)  ;
}

     
  });



  function setState(state:any , isLoading:boolean , isError:boolean , isAuthenticated:any , user:null | any , error:string|null){
    state.isLoading = isLoading;
    state.isError = isError;
    state.error= error ;
    state.isAuthenticated= isAuthenticated  ;
    state.user = user
  }

  export default userSlice.reducer ;