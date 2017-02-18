import React, {Component} from 'react';
import MapView from 'react-native-maps';
import Loading from './Loading';
import Constants from '../Constants';

export default class Map extends Component{

  constructor(props) {
    super(props);

    let map = null;
    let destinationMarker = null;
  }

  shouldComponentUpdate(nextProps){

    let allPoints = [];

    //merge points
    if(nextProps.points.nearby.length > 0 && nextProps.points.destination.length > 0)
      allPoints = [...nextProps.points.nearby, ...nextProps.points.destination];
    else
      allPoints = [nextProps.currentLocationGeo];

    // update destination name 
    if(this.destinationMarker && nextProps.points.destination.length > 0){
      this.destinationMarker.showCallout();
    }

    //center map
    this.map.fitToCoordinates(allPoints, { edgePadding: Constants.GEO.EDGE_PADDING, animated: true});

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
              {/*onPress={this.props.destinationPointMoved}>*/}

              {/* CURRENT USER LOCATION */}
              <MapView.Marker
                  coordinate={{
                    latitude: this.props.currentLocationGeo.latitude,
                    longitude: this.props.currentLocationGeo.longitude
                  }}
                  pinColor={'#3498db'}
                  title={'Vaša poloha'}
                  description={this.props.currentName}
              />

              {/* DESTINATION LOCATION */}
              <MapView.Marker 
                  draggable 
                  onDragEnd={this.props.destinationPointMoved}
                  coordinate={{
                    latitude: this.props.destinationLocationGeo.latitude,
                    longitude: this.props.destinationLocationGeo.longitude
                  }}
                  pinColor={'#8e44ad'}
                  title={'Cieľ'}
                  ref={ref => this.destinationMarker = ref }
                  description={this.props.destinationName}
              />

              {/* NEARBY STOPS */}
              {
              this.props.points.nearby.map((point, i) => {
                  return (
                    <MapView.Marker
                      key={i}
                      coordinate={{
                        latitude: point.latitude,
                        longitude: point.longitude
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
                        latitude: point.latitude,
                        longitude: point.longitude
                      }}
                      pinColor={'#2ecc71'}
                      title={point.name}
                      description={point.type + ' - ' + point.distance_in_meters + 'm'}
                    />
                  );
                })
              }
              
              <Loading show={this.props.showLoading} text={this.props.loadingText}/>
        </MapView>
      );
  }
}