import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { RootState } from '../../store/Store';

const renderGoogleMap = createAsyncThunk('googleMap/rednerGoogleMap', async () => {

})

declare interface Airport {
    label: string,
    lon: string,
    lat: string
};

let initAirport: Airport = {
    label: '',
    lat: '0',
    lon: '0'
}

const googleMapSlice = createSlice({
    name: "googleMapPoints",
    initialState: {
        airport1: initAirport,
        airport2: initAirport,
    },
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

export const getAirport1 = (state: RootState) => state.googleMap.airport1;
export const getAirport2 = (state: RootState) => state.googleMap.airport2;

export default googleMapSlice.reducer;