import React from 'react';
import './ReserveInfo.css';
import Input from '@enact/moonstone/Input';
import Dialog from '@enact/moonstone/Dialog';
import Button from '@enact/moonstone/Button';
import Scroller from '@enact/ui/Scroller';
import {
    ReserveBtn
  } from "components";

const ReserveInfo = ({color,busRouteStationList,anonymous,station,onChange,onClick,leaveStation,arriveTime}) => {

    return (
        <div className="ReserveInfo">
            <div className="out-background">
                <div className="inside-background">
                    <div className="left">
                        <Scroller
                          horizontalScrollbar="auto"
                          onScrollStart={anonymous}
                          onScrollStop={anonymous}
                        >
                        {
                                    busRouteStationList.map((item,idx) =>{
                                        return(
                                            <label>
                                            <span> {item.get('stationName')}</span>
                                            <input
                                            type="radio"
                                            name={item.get('stationName')}
                                            value={item.get('stationName')}
                                            
                                            onChange={onChange}
                                            />
                        </label>
                        
                                                )
                            })
                        }
                        {/* <label>
                            <span>{station5}</span>
                            <input
                            type="radio"
                            name="station5"
                            value={station5}
                            checked={station === station5}
                            onChange={onChange}
                            />
                        </label> */}
                        </Scroller>
                    </div>
                    <div className="right" >
                        <div >
                            <h1>{station}</h1>
                            {/* <h1>광화문</h1> */}
                            <span><p>남은 정류장 : {leaveStation}</p></span>
                            <span><p>도착 예정 시간 : {arriveTime}</p></span>
                            {/* <button id="reserve_btn" style={{backgroundColor: color}} onClick={onClick}> <strong>예 약 하 기</strong> </button>     */}
                            
                            <ReserveBtn onClick={onClick} context='하차 예약'/>
                        </div>
                            
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReserveInfo;