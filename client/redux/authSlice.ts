
import { createSlice } from '@reduxjs/toolkit';
const authSlice =createSlice({
    name :"auth",
    initialState: {
        loading:false,
        user: null,
    },
reducers: {
    setLoadnig(state, action) {
        state.loading = action.payload;
    },
    setUser(state,action){
        state.user = action.payload;
    }
    
}
})
export const { setLoadnig,setUser } = authSlice.actions;
export default authSlice.reducer;