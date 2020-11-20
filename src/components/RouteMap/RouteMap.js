import React, { useEffect } from 'react';
import './RouteMap.css';
import Scroller from '@enact/ui/Scroller';
import { Link } from 'react-router-dom';

import bus_icon from 'resources/bus_icon.png'
const {kakao} = window;
/*global kakao*/


const RouteMap = ({anonymous,onClick,firstName,busRouteStationList,map}) => {
//     useEffect (() => {
//         var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
//         var options = { //지도를 생성할 때 필요한 기본 옵션
//         center: new kakao.maps.LatLng(37.65245587442243, 126.77746762089282), //지도의 중심좌표.
//         level: 8 //지도의 레벨(확대, 축소 정도)
//         };
//         var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
//         // 선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시합니다

        
//         var linePath = [
//                 // busRouteStationList.map((item,idx) =>{
//                 //     return(
//                 //         new kakao.maps.LatLng(item.get('x'), item.get('y'))
//                 //         )
//                 //     })
//             // new kakao.maps.LatLng(37.67605791795363, 126.74739469341526),
//             // new kakao.maps.LatLng(37.6703088492401, 126.76090229800896),
//             // new kakao.maps.LatLng(37.66804136879678, 126.76539768032255),
//             // new kakao.maps.LatLng(37.65788356502882, 126.77430261424809),
//             // new kakao.maps.LatLng(37.65245587442243, 126.77746762089282),
//             // new kakao.maps.LatLng(37.6446321669496, 126.78603996089666),  
//             // new kakao.maps.LatLng(37.64112354839619, 126.79050315669939),
//             // new kakao.maps.LatLng(37.56010838268167, 126.93536729636915),
//             // new kakao.maps.LatLng(37.56278737843337, 126.94333882156029),
//             // new kakao.maps.LatLng(37.56957373652629, 126.97673768821898), 
//             // new kakao.maps.LatLng(37.56123952597079, 126.97558970275743),
//             // new kakao.maps.LatLng(37.55822877578079, 126.97310061278706)
//         ];
        

// for (var i = 0; i < linePath.length; i ++) {

//     // 마커를 생성합니다
//     var marker = new kakao.maps.Marker({
//         map: map, // 마커를 표시할 지도
//         position: linePath[i], // 마커를 표시할 위치
//         clickable: true
//     });
// } 
// kakao.maps.event.addListener(marker, 'click', function() {

// });
// // 지도에 표시할 선을 생성합니다
//         var polyline = new kakao.maps.Polyline({
//             path: linePath, // 선을 구성하는 좌표배열 입니다
//             strokeWeight: 5, // 선의 두께 입니다
//             strokeColor: '#FF0000', // 선의 색깔입니다
//             strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
//             strokeStyle: 'solid' // 선의 스타일입니다
//         });
//         marker.setMap(map);
//     // 지도에 선을 표시합니다 
//         polyline.setMap(map);  
        
//     }, []);
    return (
        <div className="RouteMap">
        <div className="out-background">
        <div className="inside-background">
			
				<h1> 노선도 </h1>
                {/* <div className="route-line">
                <Scroller
                      verticalScrollbar="auto"
                      onScrollStart={anonymous}
                      onScrollStop={anonymous}
                    >
                        <div className="route-btn"> 
                        <Link to="/detailInfo">
                            <button>백석역</button>
                        </Link>
                        </div>
                  
                </Scroller>
                </div> */}
                <div className="box">
                    <div className="left-box">
                        <h2> {
                        // busRouteStationList[0].get('stationName')
                    firstName
                    } 방면</h2>
                        
                        
                        <div className="route-line">
                        <div id="line"></div>
                            <Scroller
                                  horizontalScrollbar="auto"
                                  onScrollStart={anonymous}
                                  onScrollStop={anonymous}
                                >
                                
                                <ol >
                                            {
                                    busRouteStationList.map((item,idx) =>{
                                        return(
                                            <Link to="/detailInfo">
                                                <li key={idx}>
                                                    {item.get('stationName')}
                                                    {item.get('stationName')==='능실마을21단지.수원여대입구' ? <img src={bus_icon} width={25} height={30} />: ''}

                                                </li> 
                                                </Link>)})
                            }
                            </ol>
                            
                            {/* <ol>
                                <Link to='/detailInfo'>
                                    <li> 대화역 
                                    <img src={bus_icon} width={25} height={30} />
                                    </li>
                                   
                                </Link>

                            </ol> */}
                            </Scroller>
                        </div>
                    </div>
                    <div className="right-box">
                       
                        <div id="map"> {map}</div>
                    </div>
                </div>
                
            </div>
        </div>
        </div>
    )
}

export default RouteMap;