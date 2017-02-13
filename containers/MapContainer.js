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
          // this.props.showLoadingView(true);

          searchStops(
            {
              user_location: {
                name: this.props.currentLocation,
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
            console.log(data);
            this.props.foundStops(data);
            this.props.showLoadingView(false);
          })
          .catch( err => console.log(err) );//Alert.alert('Oops!', JSON.stringify(err)));
        }
      }/>
    );
  }
}

const mapStateToProps = state => {
  return {
    showLoading: state.show_loading,
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
    showLoadingView: (show) => dispatch(showLoading(show))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);