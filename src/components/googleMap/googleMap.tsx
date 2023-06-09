import Box from '@mui/material/Box';
import GoogleMapReact from 'google-map-react';
import { useSelector } from 'react-redux';
import { getAirport1, getAirport2 } from '../googleMap/googleMapSlice'

const GoogleMap = () => {

    const airport1 = useSelector(getAirport1);
    const airport2 = useSelector(getAirport2);

    return (
        <Box style={{ height: '100%', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBapnFHlt2GV5bTAnEr6jKu0QjR7Zl4MSA' }}
                defaultCenter={{ lat: 0, lng: 0 }}
                defaultZoom={0}
            />
        </Box>
    );
}

export default GoogleMap;