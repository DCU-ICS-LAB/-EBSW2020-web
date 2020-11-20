import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import { pender } from 'redux-pender';
import * as PassengerApi from 'store/api/passenger';



const INPUT = 'passenger/INPUT';
const REGISTER = 'passenger/REGISTER';
const SET_RATING = 'passenger/SET_RATING';
const REGISTER_RATING = 'passenger/REGISTER_RATING'
const CLEAR_RATING = 'passenger/CLEAR_RATING'

const SET_IS_MODAL_WITH_FALSE = 'passenger/SET_IS_MODAL_WITH_FALSE';
const SET_IS_MODAL_WITH_TRUE = 'passenger/SET_IS_MODAL_WITH_TRUE';


const IS_SELECTED= 'passenger/IS_SELECTED';
const SELECT_STATION ='passenger/SELECT_STATION';
const RESERVE_STATION = 'passenger/RESERVE_STATION';

const GET_BUS_ROUTE_STATION_LIST ='passenger/GET_BUS_ROUTE_STATION_LIST';
const GET_BUS_ROUTE_INFO_ITEM = 'passenger/GET_BUS_ROUTE_INFO_ITEM';
const GET_DETAIL_BUS_ROUTE_INFO='passenger/GET_DETAIL_BUS_ROUTE_INFO';

/*--------create action--------*/
export const input = createAction(INPUT);
export const register = createAction(REGISTER);

export const setRating=createAction(SET_RATING);
export const clearRating = createAction(CLEAR_RATING);
export const registerRating = createAction(REGISTER_RATING);

export const setIsModalWithFalse = createAction(SET_IS_MODAL_WITH_FALSE);
export const setIsModalWithTrue = createAction(SET_IS_MODAL_WITH_TRUE);

export const isSelected = createAction(IS_SELECTED);
export const selectStation = createAction(SELECT_STATION);
export const reserveStation = createAction(RESERVE_STATION);

export const getBusRouteStationList = createAction(GET_BUS_ROUTE_STATION_LIST,PassengerApi.getBusRouteStationList);
export const getBusRouteInfoItem = createAction(GET_BUS_ROUTE_INFO_ITEM,PassengerApi.getBusRouteInfoItem);
export const getDetailBusRouteInfo = createAction(GET_DETAIL_BUS_ROUTE_INFO,PassengerApi.getDetailBusRouteInfo);

/*--------state definition--------*/
const initialState = Map({
    busRouteStationList :  List([])
    // Map({
    //     districtCd: '',
    //     regionName:'',
    //     stationId:'',
    //     stationName:'',
    //     x:'',
    //     y:'',
    //     stationSeq:''
    // })
    ,
    routeLength:'',
    input:'',  
    driverInfo : Map({
        vehicle_num:'', 
        driver_name:'',
        driver_score: ''
    }),
    busRouteInfoItem : Map({
        companyName:'',
        companyTel:'',
        routeName: '',
        upFirstTime: '',
        downLastTime: '',
        peekAlloc : '',
        nPeekAlloc :''
    }),

    register:true,
    rating:null,
    isSelected : false,
    station :'',
    color:'#A8C2A1'
});

/*--------reducer--------*/
export default handleActions({
    [INPUT]: (state, action) => {
        console.log("input text=> " + action.payload);
        return state.set('input', action.payload);
    },
    [SELECT_STATION]: (state, action) => {
        console.log("station=> " + action.payload);
        return state.set('station', action.payload);
    },
    [REGISTER]: (state, action) => {
        console.log("register text=> " + action.payload);
        return state.set('register', action.payload);
    },
    
    [SET_RATING] : (state, action) => {
        console.log("set rating=> " + action.payload);
        return state.set('rating', action.payload);
    },
    [REGISTER_RATING] : (state, action) => {
        console.log("register rating=> " + action.payload);
        return state.set('rating', action.payload);
    },
    [CLEAR_RATING] : (state, action) => {
        return state.set('rating', null);
    },

    [IS_SELECTED]: (state, action) => {
        console.log("isSelected=> " + action.payload);
        return state.set('isSelected', action.payload);
    },
    [RESERVE_STATION]: (state, action) => {
        
        return state.set('station', action.payload) 
        // && state.set('color','red')
        ;
    },
    ...pender({
        type: REGISTER,
        onSuccess: (state, action) => {
             return state;
        },
    }),
    ...pender({
        type: GET_BUS_ROUTE_STATION_LIST,
        onSuccess: (state, action) => {
            const data = action.payload.data.data.response.msgBody;
            return state.set('busRouteStationList', List(data.busRouteStationList.map((item)=>Map({
                    stationName : item.stationName._text,
                    x : item.x._text,
                    y : item.y._text},
                    // districtCd : item.districtCd,
                    // regionName : item.regionName,
                    // stationId : item.stationId,
                    // stationName : item.stationName,
                    // x : item.x,
                    // y : item.y,
                    // stationSeq : item.stationSeq
                    
                ))));
        },
    }),
    ...pender({
        type: GET_BUS_ROUTE_INFO_ITEM,
        
        onSuccess: (state, action) => {
            const data = action.payload.data.data.response.msgBody;
            console.log('data => '+ data);
            return state.set('busRouteInfoItem', Map({
                companyName:data.busRouteInfoItem.companyName._text,
                companyTel :data.busRouteInfoItem.companyTel._text,
                routeName:data.busRouteInfoItem.routeName._text,
                upFirstTime:data.busRouteInfoItem.upFirstTime._text,
                downLastTime:data.busRouteInfoItem.downLastTime._text,
                peekAlloc :data.busRouteInfoItem.peekAlloc._text,
                nPeekAlloc :data.busRouteInfoItem.nPeekAlloc._text
            }));
        },
    }),
    ...pender({
        type: GET_DETAIL_BUS_ROUTE_INFO,
        
        onSuccess: (state, action) => {
            const data = action.payload.data.data.response.msgBody;
            return state.set('busRouteStationList', List(data.busRouteStationList.map((item)=>Map({
                    stationName : item.stationName._text,
                    x : item.x._text,
                    y : item.y._text}
                    // districtCd : item.districtCd,
                    // regionName : item.regionName,
                    // stationId : item.stationId,
                    // stationName : item.stationName,
                    // x : item.x,
                    // y : item.y,
                    // stationSeq : item.stationSeq
                ))));
        },
    }),
}, initialState);