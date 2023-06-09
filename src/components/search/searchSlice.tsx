import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchAirprots } from '../../api/airports';
import { RootState } from '../../store/Store';

// const fetchAirports = createAsyncThunk('search/airports', async () => {

// })

export const asyncSearchAirports1 = createAsyncThunk('search/airports1', async (keyword : string) => {
    const response = await searchAirprots(keyword);
    console.log('search result', response);
    return [...response];
})
export const asyncSearchAirports2 = createAsyncThunk('search/airports2', async (keyword : string) => {
    const response = await searchAirprots(keyword);
    console.log('search result', response);
    return [...response];
})

declare interface Airport {
    label: string,
    lat: string,
    lon: string
}

type NullableAirport = Airport | null;

let initAirports : Array<NullableAirport> = [];

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
        builder.addCase(asyncSearchAirports1.fulfilled, (state, action) => {
            state.airports1 = [...action.payload]
        }).addCase(asyncSearchAirports2.fulfilled, (state, action) => {
            state.airports2 = [...action.payload]
        })
    },
})

export const getAirports1 = (state: RootState) => state.search.airports1;
export const getAirports2 = (state: RootState) => state.search.airports2;

export default searchSlice.reducer;