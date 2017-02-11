import React, {Component} from 'react';
import MapView from 'react-native-maps';
import Loading from './Loading';
import Constants from '../Constants';
import {
  mergePoints
} from '../helpers';

export default class Map extends Component{

  constructor(props) {
    super(props);

    let map = null;
  }

  shouldComponentUpdate(nextProps){

    const points = mergePoints(nextProps.currentLocation, nextProps.points.nearby, nextProps.points.destination);
    
    //center map
    this.map.fitToCoordinates(points, { edgePadding: Constants.GEO.EDGE_PADDING, animated: true});

    return true;
  }

  render(){
      return (
          <MapView
              ref={ref => this.map = ref }
              style={{
                flex: 8, 
                alignSelf: 'stretch'
              }}>

              {/* CURRENT USER LOCATION */}
              <MapView.Marker
                  coordinate={{
                    latitude: this.props.currentLocation.lat,
                    longitude: this.props.currentLocation.lng
                  }}
                  pinColor={'#FFE135'}
                  title={'Vaša poloha'}
                  description={this.props.currentName}
              />

              {/* DESTINATION LOCATION */}
              <MapView.Marker
                  coordinate={{
                    latitude: this.props.destinationLocation.lat,
                    longitude: this.props.destinationLocation.lng
                  }}
                  pinColor={'purple'}
                  title={'Cieľ'}
                  description={this.props.destinationName}
              />

              {/* NEARBY STOPS */}
              {
              this.props.points.nearby.map((point, i) => {
                  return (
                    <MapView.Marker
                      key={i}
                      coordinate={{
                        latitude: point.lat,
                        longitude: point.lng
                      }}
                      title={point.name}
                      description={point.type + ' - ' + point.distance_in_meters + 'm'}
                    />
                  );
                })
              }

              {/* DESTINATION LOCATION */}
              {
              this.props.points.destination.map((point, i) => {
                  return (
                    <MapView.Marker
                      key={i}
                      coordinate={{
                        latitude: point.lat,
                        longitude: point.lng
                      }}
                      pinColor= '#bada55'
                      title={point.name}
                      description={point.type + ' - ' + point.distance_in_meters + 'm'}
                    />
                  );
                })
              }

              {this.props.showLoading ? <Loading /> : null}
        </MapView>
      );
  }
}