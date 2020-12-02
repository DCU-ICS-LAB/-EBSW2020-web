import React, { Fragment, useEffect } from 'react';
import './DetailRouteInfo.css';
import Button from '@enact/moonstone/Button';
import Scroller from '@enact/ui/Scroller';

const {kakao} = window;
/*global kakao*/

const DetailRouteInfo = ({anonymous,stationName,long,lat,busArrivalList}) => {
    
    useEffect (() => {
        var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        var options = { //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(lat,long), //지도의 중심좌표.
        level: 3 //지도의 레벨(확대, 축소 정도)
        };
        var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
        var marker = new kakao.maps.Marker({
         map: map, // 마커를 표시할 지도
         position: new kakao.maps.LatLng(lat,long), // 마커를 표시할 위치
         clickable: true
     });
     marker.setMap(map);
     var mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
   }, []);
   
    return (
       <div className="DetailRouteInfo">
      <div className="out-background">
      <div className="inside-background">
			
			<div className="left">
				<h1> {stationName} </h1>
                <div className="content">
                <Scroller
                      horizontalScrollbar="auto"
                      onScrollStart={anonymous}
                      onScrollStop={anonymous}
                    >
                    <div className="table-thead" style={{
                        borderBottom: '1px solid #aaa'
                    }}>
                        <div className="table-num" style={{width: 200}}><strong>차량번호</strong></div>
                        <div className="table-time" style={{width: 240 ,borderRight:0}}><strong>예상도착시간(분)</strong></div>
                    </div>
                    <div className="table-body">
                    {
                        busArrivalList.map((item,idx) =>{
                            return(
                            <Fragment key={idx}>
                                <div className="table-num" style={{width: 200}}>{item.get('plateNo1')}</div>
                                <div className="table-time" style={{width: 240, borderRight:0}}>{item.get('predictTime1')} </div>
                                <div className="table-num" style={{width: 200}}>{item.get('plateNo2')}</div>
                                <div className="table-time" style={{width: 240, borderRight:0}}>{item.get('predictTime2')} </div>
                            </Fragment>    
                            )
                        })
                    }
                    
                     {/*<Fragment>
                        <div className="table-num" style={{width: 200}}>3000</div>
                        <div className="table-time" style={{width: 240, borderRight:0}}>전전</div>
                     </Fragment>  
                     <Fragment>
                        <div className="table-num" style={{width: 200}}>23</div>
                        <div className="table-time" style={{width: 240, borderRight:0}}>전전</div>
                     </Fragment>*/} 
                    </div>
                </Scroller>
            </div>
            </div>
			<div id="map"></div>
		</div>
        </div>
        </div>
    )
}

export default DetailRouteInfo;