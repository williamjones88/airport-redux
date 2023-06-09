import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const fetchAirports = createAsyncThunk('search/airports', async () => {

})

const searchSlice = createSlice({
    name: "search",
    initialState: {},
    reducers: {
        test: () => {
            window.alert('search slice');
        },

    },
    extraReducers(builder) {
        builder.addCase(fetchAirports.fulfilled, () => {

        })
    },
})

export default searchSlice.reducer;