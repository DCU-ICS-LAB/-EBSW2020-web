import React, { Fragment, useEffect } from 'react';
import './RouteMap.css';
import Button from '@enact/moonstone/Button';
import Scroller from '@enact/ui/Scroller';

const {kakao} = window;
/*global kakao*/

const RouteMap = ({anonymous}) => {
    
    useEffect (() => {
        var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        var options = { //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        level: 3 //지도의 레벨(확대, 축소 정도)
        };
        var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    }, []);
    
    return (
        <div className="outLine">
        <div className="background">
			
			<div className="left">
				<h1> 백석역 </h1>
                <div className="content">
                <Scroller
                      horizontalScrollbar="auto"
                      onScrollStart={anonymous}
                      onScrollStop={anonymous}
                    >
                    <div className="table-thead" style={{
                        borderBottom: '1px solid #aaa'
                    }}>
                        <div className="table-num" style={{width: 95}}><strong>NO</strong></div>
                        <div className="table-where" style={{width: 240}}><strong>WHERE</strong></div>
                        <div className="table-time" style={{width: 95 ,borderRight:0}}><strong>TIME</strong></div>
                    </div>
                    <div className="table-body">
                    <Fragment>
                         <div className="table-num" style={{width: 95}}>1100</div>
                        <div className="table-where" style={{width: 240}}>숭례문 방면</div>
                        <div className="table-time" style={{width: 95, borderRight:0}}>전</div>
                     </Fragment>    
                     <Fragment>
                         <div className="table-num" style={{width: 95}}>1500</div>
                        <div className="table-where" style={{width: 240}}>CM충무병원 방면</div>
                        <div className="table-time" style={{width: 95,borderRight:0}}>전전</div>
                     </Fragment>    
                     <Fragment>
                         <div className="table-num" style={{width: 95}}>200</div>
                        <div className="table-where" style={{width: 240}}>홍대입구 방면</div>
                        <div className="table-time" style={{width: 95,borderRight:0}}>3분</div>
                     </Fragment>    
                     <Fragment>
                         <div className="table-num" style={{width: 95}}>3300</div>
                        <div className="table-where" style={{width: 240}}>인천공항 3층 출국장(T2) 방면</div>
                        <div className="table-time" style={{width: 95,borderRight:0}}>7분</div>
                     </Fragment>  
                     <Fragment>
                         <div className="table-num" style={{width: 95}}>3300</div>
                        <div className="table-where" style={{width: 240}}>인천공항 3층 출국장(T2) 방면</div>
                        <div className="table-time" style={{width: 95,borderRight:0}}>7분</div>
                     </Fragment>      
                     <Fragment>
                         <div className="table-num" style={{width: 95}}>3300</div>
                        <div className="table-where" style={{width: 240}}>인천공항 3층 출국장(T2) 방면</div>
                        <div className="table-time" style={{width: 95,borderRight:0}}>7분</div>
                     </Fragment>     <Fragment>
                         <div className="table-num" style={{width: 95}}>3300</div>
                        <div className="table-where" style={{width: 240}}>인천공항 3층 출국장(T2) 방면</div>
                        <div className="table-time" style={{width: 95,borderRight:0}}>7분</div>
                     </Fragment>     <Fragment>
                         <div className="table-num" style={{width: 95}}>3300</div>
                        <div className="table-where" style={{width: 240}}>인천공항 3층 출국장(T2) 방면</div>
                        <div className="table-time" style={{width: 95,borderRight:0}}>7분</div>
                     </Fragment>     <Fragment>
                         <div className="table-num" style={{width: 95}}>3300</div>
                        <div className="table-where" style={{width: 240}}>인천공항 3층 출국장(T2) 방면</div>
                        <div className="table-time" style={{width: 95,borderRight:0}}>7분</div>
                     </Fragment>     <Fragment>
                         <div className="table-num" style={{width: 95}}>3300</div>
                        <div className="table-where" style={{width: 240}}>인천공항 3층 출국장(T2) 방면</div>
                        <div className="table-time" style={{width: 95,borderRight:0}}>7분</div>
                     </Fragment>     <Fragment>
                         <div className="table-num" style={{width: 95}}>3300</div>
                        <div className="table-where" style={{width: 240}}>인천공항 3층 출국장(T2) 방면</div>
                        <div className="table-time" style={{width: 95,borderRight:0}}>7분</div>
                     </Fragment>     <Fragment>
                         <div className="table-num" style={{width: 95}}>3300</div>
                        <div className="table-where" style={{width: 240}}>인천공항 3층 출국장(T2) 방면</div>
                        <div className="table-time" style={{width: 95,borderRight:0}}>7분</div>
                     </Fragment>    

                    </div>
                </Scroller>
            </div>
            </div>
			<div id="map"></div>
		</div>
        </div>
    )
}

export default RouteMap;