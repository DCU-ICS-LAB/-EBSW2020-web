import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as passengerActions from 'store/modules/passenger';
import * as basicActions from 'store/modules/basic';
import {
    BusInfo,
    FooterBox
  } from "components";

class BusInfoPage extends Component {

    _fbSelect = (idx) => {
        const { basicActions } = this.props;
        basicActions.fbSelect(idx);
    }
    _setRating = (e) => {
        const { passengerActions } = this.props;
        passengerActions.setRating(e.target.value);
        console.log("setRating =>" + e.target.value)
        
    }
    _registerRating = () => {
        const { passengerActions,rating } = this.props;
        passengerActions.registerRating(rating);
        console.log("RegisterRating =>" + rating)
        passengerActions.clearRating(null);
    }
    componentDidMount() {
        const { passengerActions } = this.props;
        const routeId ='200000279';
        passengerActions.getBusRouteInfoItem(routeId);
    }

    render() {
        const {
            select, 
            rating,
            busRouteInfoItem
        } = this.props;

        return (
            <Fragment>
                <BusInfo
                    driver_name="김민수"
                    driver_score="4.5"
                    vehicle_num = "12가 3456"
                    routeName = {busRouteInfoItem.routeName}
                    companyName = {busRouteInfoItem.companyName}
                    companyTel = {busRouteInfoItem.companyTel}
                    upFirstTime = {busRouteInfoItem.upFirstTime} //기점 첫차 시간
                    downLastTime = {busRouteInfoItem.downLastTime} //종점 막차 시간
                    companyTel = {busRouteInfoItem.companyTel}
                    peekAlloc = {busRouteInfoItem.peekAlloc}
                    nPeekAlloc = {busRouteInfoItem.nPeekAlloc}
                    onChange={this._setRating}
                    rating={rating}
                    onClick={this._registerRating}
                    disabled={rating==null? true: false}
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
            rating:state.passenger.get('rating'),
            busRouteInfoItem: {
                companyName:state.passenger.getIn(['busRouteInfoItem', 'companyName']),
                companyTel:state.passenger.getIn(['busRouteInfoItem', 'companyTel']),
                routeName:state.passenger.getIn(['busRouteInfoItem', 'routeName']),
                upFirstTime:state.passenger.getIn(['busRouteInfoItem', 'upFirstTime']),
                downLastTime:state.passenger.getIn(['busRouteInfoItem', 'downLastTime']),
                peekAlloc :state.passenger.getIn(['busRouteInfoItem', 'peekAlloc']),
                nPeekAlloc :state.passenger.getIn(['busRouteInfoItem', 'nPeekAlloc'])
            }
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            basicActions: bindActionCreators(basicActions, dispatch),
            passengerActions : bindActionCreators(passengerActions, dispatch),
        })
    )(BusInfoPage)
)