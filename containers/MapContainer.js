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
              user_location: {
                name: this.props.currentName,
                latitude: this.props.currentLocationGeo.latitude, 
                longitude: this.props.currentLocationGeo.longitude
              }, 
              destination: {
                name: '', // name is not important here, because we want to find stops by geo coords moved destination point position
                latitude: e.nativeEvent.coordinate.latitude, 
                longitude: e.nativeEvent.coordinate.longitude
              }
            }
          ) 
          .then( data => {
            this.props.foundStops(data);
            this.props.showLoadingView(false);
          })
          .catch( err => {
            Alert.alert('Ops!', 'Nepodarilo sa nájsť zastávky.');
            this.props.showLoadingView(false);
          });
        }
      }/>
    );
  }
}

const mapStateToProps = state => {
  return {
    showLoading: state.show_loading,
    loadingText: state.loading_text,
    currentLocationGeo: state.current_location_geo,
    currentName: state.current_location || state.geolocated_address,
    destinationLocationGeo: state.destination_location_geo,
    destinationName: state.destination_location,
    points: {
        nearby: state.nearby_stops,
        destination: state.destination_stops
      }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    foundStops: (stops) => dispatch(foundStops(stops)),
    showLoadingView: (show, text) => dispatch(showLoading(show, text))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);