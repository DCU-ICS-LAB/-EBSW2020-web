import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as basicActions from 'store/modules/basic';
import * as passengerActions from 'store/modules/passenger';
import {
    RouteMap,
    FooterBox
  } from "components";
import { FaDAndDBeyond } from 'react-icons/fa';

const {kakao} = window;
/*global kakao*/
var map = null;
var markers = [];
class RouteMapPage extends Component {
    _fbSelect = (idx) => {
        const { basicActions } = this.props;
        basicActions.fbSelect(idx);
    }
    _createBusRoute= (info,map,isTarget) =>{
        var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        var options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(37.65245587442243, 126.77746762089282), //지도의 중심좌표.
            level: 8 //지도의 레벨(확대, 축소 정도)
            };
            var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
            // 선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시합니다
            var linePath = []
            info.map((item,idx)=>{
                const longitude = item.get('x');
                const latitude = item.get('y')

                console.log(longitude+','+latitude)
                linePath.push(
                    this._createMark({
                        longitude: longitude,
                        latitude: latitude,
                        idx: idx,
                        map: map,
                        isTarget: isTarget
                    })
                )
            })
            
            this._createLine({
                linePath: linePath,
                map: map,
                isTarget: isTarget
            })
            
    
    }
    _createMark = ({latitude,longitude, idx, map})=>{

        const pos = new kakao.maps.LatLng(latitude, longitude)

        var marker = new kakao.maps.Marker({
            position: pos, // 마커의 위치
        })

        marker.setMap(map);
         kakao.maps.event.addListener(marker, 'click', function() {
            
        });
        marker.setMap(map);
        
        markers.push(marker) 
        
        return pos
} 
    _createLine = ({linePath,map}) => {
        if(linePath.size<=1) return

        var polyline = new kakao.maps.Polyline({
            path: linePath, // 선을 구성하는 좌표배열 입니다
            strokeWeight: 5, // 선의 두께 입니다
            strokeColor: '#FF0000', // 선의 색깔입니다
            strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid' // 선의 스타일입니다
        });

            polyline.setMap(map);
    }
    
    componentDidMount() {
        const { passengerActions} = this.props;
        const routeId =200000279;
        passengerActions.getBusRouteStationList(routeId);
        
    }
    componentDidUpdate() {
        const { busRouteStationList} = this.props;
        this._createBusRoute(busRouteStationList, map, true) 
        console.log('check call->'+busRouteStationList)
        
    }
    // busRouteStationList.length
    // busRouteStationList[43]
    render() {
        const {
            select,
            busRouteStationList,
            firstName
        } = this.props;
        var idx = busRouteStationList.length;
        console.log('get LENGTH ->'+idx)
        return (
            
           
            <Fragment>
                <RouteMap busRouteStationList={busRouteStationList}
                firstName={busRouteStationList.getIn([idx-1,'stationName'])}
                // firstName={busRouteStationList.getIn([0,'stationName'])}
                // map={this._createBusRoute}
                />
                <FooterBox select={select} fbSelect={this._fbSelect}/>
            </Fragment>
        )
    }
}


export default withRouter(
    connect(
        // props 로 넣어줄 스토어 상태값
        state => ({
            select: state.basic.getIn(['basic', 'select']),
            busRouteStationList: state.passenger.get('busRouteStationList'),
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            basicActions: bindActionCreators(basicActions, dispatch),
            passengerActions: bindActionCreators(passengerActions, dispatch)
        })
    )(RouteMapPage)
)