import React, {Component} from "react";
import {Alert} from "react-native";
import {connect} from "react-redux";
import {searchStops} from "../api";
import Constants from "../Constants";
import {foundStops, setDeparturesDestinationStop, setDeparturesStartStop, showDirection, showLoading, changeDeparturesSelectedStop} from "../Actions";
import Map from "../components/Map";

class MapContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Map {...this.props}
                 destinationPointMoved={e => {
                     this.props.showLoadingView(true, 'Vyhľadávam zastávky pre zvolený bod');

                     searchStops({
                             start: {
                                 name: this.props.startName,
                                 latitude: this.props.startLocationGeo.latitude,
                                 longitude: this.props.startLocationGeo.longitude
                             },
                             destination: {
                                 name: '', //searching by coordinates, name is not needed here
                                 latitude: e.nativeEvent.coordinate.latitude,
                                 longitude: e.nativeEvent.coordinate.longitude
                             },
                             city: this.props.selectedCity.name
                         }
                     )
                         .then(data => this.props.foundStops(data))
                         .catch(err => Alert.alert('Ops!', err))
                         .then(() => this.props.showLoadingView(false));
                 }
                 }

                 selectStop={ stopName => {
                     if (this.props.departuresSelectedStopInput === Constants.DEPARTURES.SELECTED_START_STOP_INPUT) {
                         this.props.setDeparturesStartStop(stopName);

                         // automatically set destination stop select as active
                         if (this.props.departuresDestinationStop === '') {
                             this.props.changeDeparturesSelectedStop(Constants.DEPARTURES.SELECTED_DESTINATION_STOP_INPUT)
                         }
                     }
                     else if (this.props.departuresSelectedStopInput === Constants.DEPARTURES.SELECTED_DESTINATION_STOP_INPUT) {
                         this.props.setDeparturesDestinationStop(stopName);
                     }
                 }}
            />
        );
    }
}

const mapStateToProps = state => {
    return {

        showLoading: state.showLoading,
        loadingText: state.loadingText,
        loadingType: state.loadingType,

        startName: state.startLocation || state.geolocatedAddress,
        startLocationGeo: state.startLocationGeo,
        nearbyDirection: state.nearbyDirection,

        destinationName: state.destinationLocation,
        destinationLocationGeo: state.destinationLocationGeo,
        destinationDirection: state.destinationDirection,

        geolocatedAddress: state.geolocatedAddress,
        geolocatedLocationGeo: state.geolocatedLocationGeo,

        departuresDestinationStop: state.departuresDestinationStop,

        points: {
            nearby: state.nearbyStops,
            destination: state.destinationStops
        },

        isMapBlocked: state._mapBlocked,
        selectedCity: state.selectedCity,
        firstGeolocationDone: state.firstGeolocationDone,

        mapCenterPoints: state.mapCenterPoints,

        departuresSelectedStopInput: state.departuresSelectedStopInput,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        foundStops: (stops) => dispatch(foundStops(stops)),
        showLoadingView: (show, text) => dispatch(showLoading(show, text)),
        showDirection: (directions, type) => dispatch(showDirection(directions, type)),
        setDeparturesStartStop: (stopName) => dispatch(setDeparturesStartStop(stopName)),
        setDeparturesDestinationStop: (stopName) => dispatch(setDeparturesDestinationStop(stopName)),
        changeDeparturesSelectedStop: (selectedStop) => dispatch(changeDeparturesSelectedStop(selectedStop)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);