import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as passengerActions from 'store/modules/passenger';
import * as basicActions from 'store/modules/basic';
import {
    DetailRouteInfo,
    FooterBox
  } from "components";
class DetailInfoPage extends Component {

    _fbSelect = (idx) => {
        const { basicActions } = this.props;
        basicActions.fbSelect(idx);
    }
    
    componentDidMount() {
        const { passengerActions} = this.props;
        // const { passengerActions,match,routeId,stationName} = this.props;
        const stationId =277104476;
        passengerActions.getDetailBusRouteInfo(stationId);
    }

    render() {
        const {
            select, 
            busRouteStationList,
            busArrivalList,
            match
        } = this.props;

        console.log(match.params.stationName)
        const long = match.params.x;
        const lat = match.params.y;
        const name = match.params.stationName;

        return (
            <Fragment>
                <DetailRouteInfo busRouteStationList={busRouteStationList}
                busArrivalList={busArrivalList}
                stationName={name}
                long={long}
                lat ={lat}/>
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
            busArrivalList: state.passenger.get('busArrivalList'),
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            basicActions: bindActionCreators(basicActions, dispatch),
            passengerActions: bindActionCreators(passengerActions, dispatch)

        })
    )(DetailInfoPage)
)