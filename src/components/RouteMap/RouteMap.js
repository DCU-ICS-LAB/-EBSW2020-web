import React from 'react';
import './RouteMap.css';
import Scroller from '@enact/ui/Scroller';
import { Link } from 'react-router-dom';

import bus_icon from 'resources/bus_icon.png'
const {kakao} = window;
/*global kakao*/


const RouteMap = ({anonymous,onClick,firstName,busRouteStationList,map}) => {
    return (
        <div className="RouteMap">
        <div className="out-background">
        <div className="inside-background">
			
				<h1> 노선도 </h1>
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
                                            
                                            <Link to={`/detailInfo/${item.get('stationName')}/${item.get('x')}/${item.get('y')}/${item.get('stationId')}`}>
                                                <li key={idx}>
                                                    {item.get('stationName')}
                                                    {item.get('stationName')==='능실마을21단지.수원여대입구' ? <img src={bus_icon} width={25} height={30} />: ''}

                                                </li> 
                                                </Link>)})
                            }
                            </ol>
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