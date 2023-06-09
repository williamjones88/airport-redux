import axios, { AxiosResponse } from 'axios';

declare interface airportInterface {
    label: string,
    lon: string,
    lat: string
};
type NullableAirport = airportInterface | null;

declare interface paramInterface {
    page: Number,
    limit: Number,
    sortBy: string | 'AirportName:asc'
}

export const searchAirprots = (keyword: string) : Promise<Array<NullableAirport>> => {
    return new Promise((resolve, reject) => {

        var airports: Array<NullableAirport> = [];
    
        if (keyword === '') {
            return airports;
        }
    
        let params: paramInterface = {
            page: 1,
            limit: 20,
            sortBy: 'AirportName:asc'
        }
    
        const options = {
            method: 'GET',
            url: 'https://world-airports-directory.p.rapidapi.com/v1/airports/' + keyword,
            params: params,
            headers: {
                'X-RapidAPI-Key': '6c73148f76msh09c4b5e944ee757p126c74jsn8c3d7ed748fd',
                'X-RapidAPI-Host': 'world-airports-directory.p.rapidapi.com'
            }
        };
        const response: Promise<AxiosResponse> = axios.request(options);
        response.then((res: AxiosResponse) => {
            airports = res.data.results.map((val: any) => {
                return {
                    label: val.AirportName,
                    lon: val.long,
                    lat: val.lat
                }
            })
            resolve(airports);
        });
    
    })
}