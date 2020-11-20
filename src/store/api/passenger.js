import axios from 'axios';
import ip from 'ip';
import {
    API_BASE_URL
} from '../../constants';

//노선도 조회
export const getBusRouteStationList = (routeId) => {
    
    const baseURL = `${API_BASE_URL}/passenger/routeInfo/${routeId}`;
    // const baseURL = `${API_BASE_URL}/passenger/routeInfo/200000279`;
    console.log("getBusRouteStationList");
    return axios
        .get(baseURL)
        .then(res => {
            console.log(`api call getRoute`);
            console.log(res);
            return res;
        })
}
//특정 정류장 정보 조회
export const getDetailBusRouteInfo = (stationId,stationName) => {
    
    const baseURL = `${API_BASE_URL}/passenger/stationInfo/${stationId}/${stationName}`;
    console.log("getDetailBusRouteInfo");
    return axios
        .get(baseURL)
        .then(res => {
            console.log(`detail bus route info api call`);
            console.log(res);
            console.log(stationName);
            return res;
        })
}

//버스 기사 평가 등록
export const registerDriverRating = (driver_id) => {

    const baseURL = `${API_BASE_URL}/passenger/driver_rating/${driver_id}`;
    console.log("registerDriverRating");
    return axios
    .post(baseURL)
    .then(res => {
        console.log(res);
        return res;
    });
}

//운행 정보 조회 (기사, 버스 정보)
export const getBusRouteInfoItem = (routeId) => {
    const baseURL = `${API_BASE_URL}/passenger/info/${routeId}`;
    return axios
        .get(baseURL)
        .then(res => {
            console.log(`api call businfo`);
            console.log(res);
            return res;
        });
} 

// export const registerConfirmer = (driver_id) => {
//     const baseURL = `${API_BASE_URL}/passenger/driver_rating/${driver_id}`;
//     return axios
//         .post(baseURL, confirmerInfo)
//         .then(res => {
//             console.log(res);
//             return res;
//         });
// } 
