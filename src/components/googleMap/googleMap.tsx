import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import GoogleMapReact from 'google-map-react';
import { useSelector } from 'react-redux';
import { getAirport1, getAirport2 } from '../googleMap/googleMapSlice'
import { MarkerF, GoogleMap as GoogleMapApi, PolylineF, useJsApiLoader } from '@react-google-maps/api'

declare interface airportInterface {
    label: string,
    lon: string,
    lat: string
};

type NullableAirport = airportInterface | null;

let initAirport: NullableAirport = {
    label: '',
    lon: '0',
    lat: '0'
}

declare interface LatLng {
    lon: number,
    lat: number
}

const lineSymbol = {
    path: "M 0,-1 0,1",
    strokeOpacity: 1,
    scale: 4,
  };

const GMap = () => {

    const airport1 = useSelector(getAirport1);
    const airport2 = useSelector(getAirport2);

    const [polylinePath, setPolylinePath] = useState<Array<LatLng>>([]);

    useEffect(() => {
        if (airport1.label !== '' && airport2.label !== '') {
            let path : Array<LatLng> = [];
            path.push(getPath(airport1));
            path.push(getPath(airport2));
            setPolylinePath([...path]);
        }
    }, [])

    const containerStyle = {
        width: '100%',
        height: '100%'
    };


    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyBapnFHlt2GV5bTAnEr6jKu0QjR7Zl4MSA'
    });

    const getPath = (airport: airportInterface) => {

        return {
            lat: parseFloat(airport.lat),
            lon: parseFloat(airport.lon)
        };
    }

    if (!isLoaded) {
        return <div>Loading...</div>
    }
    // else {
    { console.log('rerender'); }
    return (
        <Box style={{ height: '100%', width: '100%' }}>
            <GoogleMapApi
                mapContainerStyle={containerStyle}
                center={{ lat: 23, lng: 33 }}
                zoom={1}
            >
                {airport1.label === '' ? '' : <MarkerF position={{ lat: parseFloat(airport1.lat), lng: parseFloat(airport1.lon) }}></MarkerF>}
                {airport2.label === '' ? '' : <MarkerF position={{ lat: parseFloat(airport2.lat), lng: parseFloat(airport2.lon) }}></MarkerF>}
                <PolylineF
                    // path={polylinePath}
                    path={[{lat:3, lng:32},{lat:21, lng: 78}]}
                    options={{
                        strokeColor: '#000000',
                        strokeOpacity: 1,
                        strokeWeight: 3,
                    }}
                />
            </GoogleMapApi>
        </Box>
    );
    // }

}

export default GMap;