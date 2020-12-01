import React from 'react';
import './BusInfo.css';
import driver_picture from 'resources/driver_picture.png'
import {FaStar} from 'react-icons/fa';
import Button from '@enact/moonstone/Button';
import Popup from '@enact/moonstone/Popup';

const BusInfo = ({
    driver_name,
    busRouteInfoItem,
    driver_score, 
    vehicle_num, 
    routeName, 
    companyName, 
    upFirstTime,
    downLastTime,
    companyTel,
    peekAlloc,
    nPeekAlloc,
    onChange,
    onClick,
    disabled,
    rating
}) => {
    const stars = [0,1,2,3,4]
      return (
        <div className="BusInfo">
            <div className="out-background">
                <div className="inside-background">
                    <div className="driver_info">
                        <div className="driver_tab"><strong>기사 정보</strong></div>
                        <div className="driver_picture"> <img src={driver_picture}></img></div>
                        <div className="driverInfo_text">
                            <strong><h2 id="name">{driver_name}</h2></strong>
                            <p>{companyName}</p>
                            <p>{companyTel}</p>
                            <div className="driver_score">
                                <p>운전사 평점 : </p>
                                <p id="score">{driver_score} </p>
                                <p> / 5.0</p>
                            </div>
                        </div>
                        <div className="rating">
                            
                        <div className="rating_star">
                        {stars.map((star,i) => {
                            const ratingValue = i+1;
                            
                            console.log("rating->", rating)
                            console.log("ratingValue->", ratingValue)
                            
                            return (
                                <label>
                                <input
                                    type="radio"
                                    name="rating"
                                    value={ratingValue}
                                    onChange={onChange}
                                    onClick={()=>rating}
                                />
                                
                                <FaStar 
                                    className="star"
                                    color={ratingValue <= rating? "#ffc107" : "#D7D8DD"}
                                    size={50}
                                    />
                                </label>
                            );
                        })}
                        
                        </div>
                        
                        <div className="rating_button">
                            <Button 
                            id="btn_rating"
                            onClick={onClick}
                            disabled={ disabled }
                            >
                                평가하기
                            </Button>
                            {/* <div>
                            <Popup onClose={anonymous} onHide={anonymous} onShow={anonymous}>
                            <div>
                            Hello Popup
                            </div>
                            </Popup>
                            <BodyText centered>
                            Use KNOBS to interact with Popup.
                            </BodyText>
                            </div> */}
                        </div>
                        </div>
                    </div>
                    
                    <hr style={{marginBlockStart:'0'}}/>
                    
                    <div className="bus_info">
                    <div className="busInfo_tab"><strong>버스 정보</strong></div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><strong>차량 번호</strong></td>
                                        <td> {vehicle_num}</td>
                                    </tr>
                                    <tr>
                                        <td><strong> 노선 번호 </strong></td>
                                        <td> {routeName}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><strong> 운행 시간</strong></td>
                                        <td> {upFirstTime} ~ {downLastTime}</td>
                                    </tr>
                                    <tr>
                                        <td><strong> 배차 간격</strong></td>
                                        <td>{peekAlloc}분 ~ {nPeekAlloc}분</td>
                                    </tr>
                                    </tbody>
                            </table>
                            
                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BusInfo;