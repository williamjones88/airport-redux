import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const renderGoogleMap = createAsyncThunk('googleMap/rednerGoogleMap', async () => {

})

const googleMapSlice = createSlice({
    name: "googleMapPoints",
    initialState: [],
    reducers: {
        test(state) {
            window.alert('google map slice');
        },
    },
    extraReducers(builder) {
        builder.addCase(renderGoogleMap.fulfilled, (state, action) => {

        })
    }
})

export default googleMapSlice.reducer;