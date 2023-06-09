import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid'
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux';
import { getAirports1, getAirports2 } from './searchSlice';
// import { getAirports } from '../api/airports'

declare interface airportInterface {
    label: string,
    lon: string,
    lat: string
};
type NullableAirport = airportInterface | null;


const Search = () => {

    let initAirports: Array<NullableAirport> = [];

    const airports1 : Array<airportInterface> = useSelector(getAirports1) || [];
    const airports2 : Array<airportInterface> = useSelector(getAirports2) || [];


    const [distance, setDistance] = useState(0);
    const [keyword, setKeyword] = useState('');
    // const [airports1, setAirports1] = useState(initAirports);
    // const [airports2, setAirports2] = useState(initAirports);

    let init: NullableAirport = { label: '', lon: '0', lat: '0' }

    const [airport1, setAirport1] = useState(init);
    const [airport2, setAirport2] = useState(init);
    const [val1, setVal1] = useState('');
    const [val2, setVal2] = useState('');

    // useEffect(() => {
    //     if (airports1.length !== 0 && airports2.length !== 0) {
    //         drawCurve();
    //     }
    // }, [airports1, airports2])

    const calDistance = () => {

        if (airport1.label === '' && airport2.label === '') {
            //notificatoins
            return;
        }
        let lon1 = Number.parseFloat(airport1.lon.valueOf());
        let lon2 = Number.parseFloat(airport2.lon.valueOf());
        let lat1 = Number.parseFloat(airport1.lat.valueOf());
        let lat2 = Number.parseFloat(airport2.lat.valueOf());
        var p = 0.017453292519943295;    // Math.PI / 180
        var c = Math.cos;
        var a = 0.5 - c((lat2 - lat1) * p) / 2 +
            c(lat1 * p) * c(lat2 * p) *
            (1 - c((lon2 - lon1) * p)) / 2;

        return setDistance(12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
    }

    // const drawCurve = () => {

    // }

    const handleChange1 = (e: any, v: NullableAirport, r: string) => {
        console.log('log', v);
        if (v !== null) {
            setAirport1(v);
        }
    }

    const handleChange2 = (e: any, v: NullableAirport, r: string) => {
        console.log('log', v);
        if (v !== null) {
            setAirport2(v);
        }
    }

    return (
        <Grid container padding={1} spacing={2}>
            <Grid item container xs={12} md={4}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo1"
                    sx={{ width: '100%' }}
                    options={airports1}
                    value={airport1}
                    renderInput={(params) => <TextField {...params} />}
                    inputValue={val1.valueOf()}
                    onChange={(e: any, v: NullableAirport, r: string) => handleChange1(e, v, r)}
                    onInputChange={async (event, newInputValue) => {
                        setVal1(newInputValue);
                        // let airports : Array<NullableAirport> = await getAirports(newInputValue);
                        // setAirports1([...airports]);
                        // console.log('airports', airports);
                    }}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo2"
                    sx={{ width: '100%' }}
                    value={airport2}
                    options={airports2}
                    renderInput={(params) => <TextField {...params} />}
                    inputValue={val2.valueOf()}
                    onChange={(e: any, v: NullableAirport, r: string) => handleChange2(e, v, r)}
                    onInputChange={async (event, newInputValue) => {
                        setVal2(newInputValue);
                        // let airports : Array<NullableAirport> = await getAirports(newInputValue);
                        // console.log('airports', airports);
                        // setAirports2([...airports]);
                    }}
                />
            </Grid>
            <Grid item xs={6} md={2} container alignContent="center" justifyContent="center">
                <Button variant='outlined' onClick={() => { calDistance() }}>
                    Calculate
                </Button>
            </Grid>
            <Grid item xs={6} md={2} container alignContent="center" justifyContent="center">
                <Typography>
                    {distance.toFixed(5)} nmi
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Search;