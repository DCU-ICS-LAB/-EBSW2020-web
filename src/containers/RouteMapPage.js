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
      import {
          DEFAULT_MAP_OPTION
      } from 'constants/index'
    import { FaDAndDBeyond } from 'react-icons/fa';
    
    const {kakao} = window;
    /*global kakao*/
    var map = null;
    var markers = [];
    var linePath=[];

    class RouteMapPage extends Component {
        _fbSelect = (idx) => {
            const { basicActions } = this.props;
            basicActions.fbSelect(idx);
        }
        _createBusRoute= (info,map,isTarget) =>{
                info.map((item,idx)=>{
                    const longitude = item.get('x');
                    const latitude = item.get('y');
                    const stationName = item.get('stationName');

                    linePath.push(
                        this._createMark({
                            longitude: longitude,
                            latitude: latitude,
                            idx: idx,
                            map: map,
                            isTarget: isTarget,
                            stationName : stationName
                        })
                    )
                })
                this._createLine({
                    linePath: linePath,
                    map: map,
                    isTarget: isTarget
                })
                var mapTypeControl = new kakao.maps.MapTypeControl();

                // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
                // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
                map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

                // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
                var zoomControl = new kakao.maps.ZoomControl();
                map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
        }

        _createMark = ({latitude,longitude, idx, map,stationName})=>{
    
            const pos = new kakao.maps.LatLng(latitude, longitude)
    
            var marker = new kakao.maps.Marker({
                position: pos, // 마커의 위치
                clickable: true
            })
    
            marker.setMap(map);
            
            markers.push(marker);

            var iwContent  = '<div style="padding:5px;">'+stationName+'</div>',
             iwRemoveable = true; 

                var infowindow = new kakao.maps.InfoWindow({
                    content: iwContent,
                    removable : iwRemoveable
                });
                // 마커에 클릭이벤트를 등록합니다
            kakao.maps.event.addListener(marker, 'click', function() {// 마커 위에 인포윈도우를 표시합니다
                infowindow.open(map, marker);  
            });
            

            return pos;
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
            // const { passengerActions,routeId} = this.props;
            const routeId =200000279;
            passengerActions.getBusRouteStationList(routeId);
            kakao.maps.load(() => {
                const el = document.getElementById('map')
                const mapOption = {
                    center: new kakao.maps.LatLng(DEFAULT_MAP_OPTION.center.latitude, DEFAULT_MAP_OPTION.center.longitude),
                    level: DEFAULT_MAP_OPTION.level
                }
                map = new kakao.maps.Map(el, mapOption)
            })
        }
        
        componentDidUpdate() {
            const { busRouteStationList} = this.props;
            this._createBusRoute(busRouteStationList, map, true) 
            
        }
        render() {
            const {
                select,
                busRouteStationList
            } = this.props;
            return (
                
               
                <Fragment>
                    <RouteMap busRouteStationList={busRouteStationList}
                    firstName={busRouteStationList.getIn([linePath.length-1,'stationName'])}
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