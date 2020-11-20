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
        const routeId =200000279;
        const stationName ='능실마을21단지.수원여대입구';
        passengerActions.getDetailBusRouteInfo(routeId,stationName);
    }

    render() {
        const {
            select, 
            busRouteStationList
        } = this.props;

        return (
            <Fragment>
                <DetailRouteInfo busRouteStationList={busRouteStationList}/>
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
    )(DetailInfoPage)
)