import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid'
import Autocomplete from '@mui/material/Autocomplete';
import { Button, CardContent } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Card from '@mui/material/Card';
import LinearProgress from '@mui/material/LinearProgress';
import Slide, { SlideProps } from '@mui/material/Slide';

import {
    getAirports1,
    getAirports2,
    asyncSearchAirports1,
    asyncSearchAirports2
} from './searchSlice';
import {
    getAirport1,
    getAirport2,
    updateAirport1,
    updateAirport2
} from '../googleMap/googleMapSlice';

import { debounce } from 'lodash';

declare interface airportInterface {
    label: string,
    lon: string,
    lat: string
};
type NullableAirport = airportInterface | null;

type TransitionProps = Omit<SlideProps, 'direction'>;

const Search = () => {

    let initAirports: Array<NullableAirport> = [];

    const airports1: Array<NullableAirport> = useSelector(getAirports1) || [];
    const airports2: Array<NullableAirport> = useSelector(getAirports2) || [];
    const airport1: NullableAirport = useSelector(getAirport1);
    const airport2: NullableAirport = useSelector(getAirport2);


    const [distance, setDistance] = useState(0);

    const dispatch: any = useDispatch();

    let init: NullableAirport = { label: '', lon: '0', lat: '0' }

    const [val1, setVal1] = useState('');
    const [val2, setVal2] = useState('');
    const [snackBar, setSnackBar] = useState(false);
    const [transition, setTransition] = React.useState<
    React.ComponentType<TransitionProps> | undefined
  >(undefined);

    function TransitionLeft(props: TransitionProps) {
        return <Slide {...props} direction="left" />;
      }

    const handleClose = () => {
        setSnackBar(false);
    }

    const calDistance = () => {

        if (airport1.label === '' && airport2.label === '') {
            //notificatoins
            setTransition(() => TransitionLeft);
            setSnackBar(true);
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

    const handleSearch1 = (e: React.SyntheticEvent, v: string, r: string) => {
        setVal1(v);
        dispatch(asyncSearchAirports1(v));
    }

    const handleSearch2 = async (e: React.SyntheticEvent, v: string, r: string) => {
        setVal2(v);
        dispatch(asyncSearchAirports2(v));
    }

    const handelChange1 = (e: React.SyntheticEvent, v: NullableAirport, r: string) => {
        dispatch(updateAirport1(v));
    }

    const handelChange2 = (e: React.SyntheticEvent, v: NullableAirport, r: string) => {
        dispatch(updateAirport2(v));
    }

    const handelSearchDebounced1 = debounce(handleSearch1, 500);
    const handelSearchDebounced2 = debounce(handleSearch2, 500);

    return (
        <Grid container padding={1} spacing={2}>
            <Grid item container xs={12} md={4}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo1"
                    sx={{ width: '100%' }}
                    options={airports1}
                    value={airport1}
                    onChange={(e: React.SyntheticEvent, v: NullableAirport, r: string) => handelChange1(e, v, r)}
                    renderInput={(params) => <TextField {...params} />}
                    onInputChange={handelSearchDebounced1}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo2"
                    sx={{ width: '100%' }}
                    value={airport2}
                    onChange={(e: React.SyntheticEvent, v: NullableAirport, r: string) => handelChange2(e, v, r)}
                    options={airports2}
                    renderInput={(params) => <TextField {...params} />}
                    onInputChange={handelSearchDebounced2}
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
            <Grid>
                <Snackbar
                    open={snackBar}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    TransitionComponent={transition}
                >
                    <Card>
                        <CardContent>
                            Please select two airports
                        </CardContent>
                        <LinearProgress color="inherit" />
                    </Card>
                </Snackbar>
            </Grid>
        </Grid>
    )
}

export default Search;