import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import {
    RouteMapPage,
    BusInfoPage,
    DetailInfoPage,
    ReservationPage,
    InfoPage,
    NoticePage
} from 'containers';


class App extends Component {
    render() {
        return (
            
            <div className="App">
                <Switch>
                    <Route exact path="/" component={RouteMapPage} />
                    <Route path="/driveInfo" component={BusInfoPage} />
                    <Route path="/detailInfo/:stationName/:x/:y/:stationId" component={DetailInfoPage} />
                    <Route path="/reserve" component={ReservationPage} />
                    <Route path="/info" component={InfoPage} />
                    <Route path="/notice" component={NoticePage} />
                </Switch> 
            </div>
        );
    }
}

export default App;