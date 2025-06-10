import { createSlice } from "@reduxjs/toolkit";

interface createSlice {
    singleCompany: any | null;
    loading: boolean;
    error: string | null;
}

// const initialState: CompanyState = {
//     singleCompany: null,
//   loading: false,
//   error: null,
// };

const companySlice = createSlice({
    name: "company",
    initialState: {
        singleCompany: null,
        companies:[],
    },
    reducers: {
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload;
        },
        setCompanies: (state, action) => {
          state.companies = action.payload;
        },
        // setError: (state, action) => {
        //   state.error = action.payload;
        // },
        // addCompany: (state, action) => {
        //   state.companies.push(action.payload);
        // },
    },
});

export const {
    // setLoading,
     setCompanies, 
    // setError, 
    // addCompany 
    setSingleCompany
} = companySlice.actions;
export default companySlice.reducer; 