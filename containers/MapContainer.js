import React, { Component } from 'react';
import {Alert} from 'react-native';
import { connect } from 'react-redux';
import { searchStops } from '../api';
import { foundStops, showLoading } from '../Actions';
import Map from '../components/Map';

class MapContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Map {...this.props} 
        destinationPointMoved={e => {
          this.props.showLoadingView(true, 'Vyhľadávam zastávky pre zvolený bod');

          searchStops(
            {
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
          .then( data => this.props.foundStops(data))
          .catch( err => Alert.alert('Ops!', err))
          .then(() => this.props.showLoadingView(false));
        }
      }/>
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

    destinationName: state.destinationLocation,
    destinationLocationGeo: state.destinationLocationGeo,

    geolocatedAddress: state.geolocatedAddress,
    geolocatedLocationGeo: state.geolocatedLocationGeo,
    
    points: {
      nearby: state.nearbyStops,
      destination: state.destinationStops
    },

    isMapBlocked: state._mapBlocked,

    selectedCity: state.selectedCity,

  };
};

const mapDispatchToProps = dispatch => {
  return {
    foundStops:      (stops)      => dispatch(foundStops(stops)),
    showLoadingView: (show, text) => dispatch(showLoading(show, text))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);