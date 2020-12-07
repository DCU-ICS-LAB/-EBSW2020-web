import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as passengerActions from 'store/modules/passenger';
import * as basicActions from 'store/modules/basic';
import Dialog from '@enact/moonstone/Dialog';
import Notification from '@enact/moonstone/Notification';
import {
    ReserveInfo,
    FooterBox,
    Modal
  } from "components";
  
class ReservationPage extends Component {

    _fbSelect = (idx) => {
        const { basicActions } = this.props;
        basicActions.fbSelect(idx);
    }
    _isSelected = () => {
        const { passengerActions, isSelected } = this.props;
        passengerActions.isSelected(!isSelected);
        console.log('isSelected->',isSelected);
    }
    _selectStation =(e) => {
        const { passengerActions } = this.props;
        passengerActions.selectStation(e.target.value);
    }
    _reserveStation =() => {
        const { passengerActions,color,station } = this.props;
        passengerActions.reserveStation(station,color);
    }
    constructor(props) {
        super(props);
        this.state = {selected: true};
        this.handleClick = this.handleClick.bind(this);
      }
    handleClick() {
        this.setState(state => ({
            selected : !state.selected
        }));
    }
    componentDidMount() {
        const { passengerActions} = this.props;
        const routeId =200000279;
        passengerActions.getBusRouteStationList(routeId);
    }
    render() {
        const {
            select,
            station,
            busRouteStationList
        } = this.props;

        
        return (
            <Fragment>
                <ReserveInfo 
                leaveStation="5"
                arriveTime="17:00"
                busRouteStationList={busRouteStationList}
                station={station}
                onChange={this._selectStation}
                onClick={
                    this._reserveStation,this.handleClick
                }
                context={this.state.selected ? '하차 예약':'예약 취소'}
                >
                </ReserveInfo>
                <FooterBox select={select} fbSelect={this._fbSelect}/>
            </Fragment>
        )
    }
}


export default withRouter(
    connect(
        // props 로 넣어줄 스토어 상태값
        state => ({
            station : state.passenger.get('station'),
            isSelected : state.passenger.get('isSelected'),
            select: state.basic.getIn(['basic', 'select']),
            input: state.passenger.get('input'),
            showModal : state.passenger.get('showModal'),
            color : state.passenger.get('color'),
            busRouteStationList: state.passenger.get('busRouteStationList'),
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            basicActions: bindActionCreators(basicActions, dispatch),
            passengerActions : bindActionCreators(passengerActions, dispatch),
        })
    )(ReservationPage)
)