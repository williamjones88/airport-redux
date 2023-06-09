import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store/Store';

const fetchAirports = createAsyncThunk('search/airports', async () => {

})

declare interface Airport {
    label: string,
    lat: string,
    lon: string
}

let initAirports : Array<Airport> = [];

const searchSlice = createSlice({
    name: "search",
    initialState: {
        airports1: initAirports,
        airports2: initAirports
    },
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

export const getAirports1 = (state: RootState) => state.search.airports1;
export const getAirports2 = (state: RootState) => state.search.airports2;

export default searchSlice.reducer;