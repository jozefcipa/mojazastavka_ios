import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { parseDistance, calculateToleranceCoords } from '../helpers';
import Loading from './Loading';
import Constants from '../Constants';
import pointImg from '../assets/point.png';
import finishImg from '../assets/finishPoint.png';
import userLocationImg from '../assets/userLocation.png';
import Callout from './Callout';

export default class Map extends Component{

  constructor(props) {
    super(props);

    let map = null;
    let destinationMarker = null;
  }

  shouldComponentUpdate(nextProps){

    if(nextProps.isMapBlocked)
      return false;

    let allPoints = [];

    //merge points
    if(nextProps.points.nearby.length > 0 && nextProps.points.destination.length > 0){
      allPoints = [
        ...nextProps.points.nearby, 
        ...nextProps.points.destination,
        nextProps.startLocationGeo,
        nextProps.destinationLocationGeo
      ];

      // update destination name 
      //TODO: SHOWS WEIRD CALLOUT
      if(this.destinationMarker){
        this.destinationMarker.showCallout();
      }
    }
    // if geolocation is disabled, center map to default coords
    else if (nextProps.geolocatedLocationGeo.latitude == 0 || nextProps.geolocatedLocationGeo.longitude == 0) {
      allPoints = [...Constants.GEO.DEFAULT_COORDS];
    }
    else{
      allPoints = [
        nextProps.geolocatedLocationGeo,
        ...calculateToleranceCoords(nextProps.geolocatedLocationGeo, Constants.GEO.RADIUS_KM)
      ];
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
              }}
              onLongPress={this.props.destinationPointMoved}>

              {/* GEOLOCATED LOCATION */}
              <MapView.Marker
                coordinate={{
                  latitude: this.props.geolocatedLocationGeo.latitude,
                  longitude: this.props.geolocatedLocationGeo.longitude
                }}
                >{/*image={userLocationimg} */}
                  <Callout type={'GEO'} name={'Vaša poloha'} descriptionText={this.props.geolocatedAddress} />
              </MapView.Marker>

              {/* START USER LOCATION */}
              {
                this.props.geolocatedAddress !== this.props.startName ? 
                  <MapView.Marker
                    coordinate={{
                      latitude: this.props.startLocationGeo.latitude,
                      longitude: this.props.startLocationGeo.longitude
                    }}
                    image={userLocationImg}>
                      <Callout type={'START'} name={'Štart'} descriptionText={this.props.startName} />
                  </MapView.Marker>
                  : 
                    null
              }

              {/* DESTINATION LOCATION image={finishImg}*/}
              <MapView.Marker 
                draggable
                onDragEnd={this.props.destinationPointMoved}
                coordinate={{
                  latitude: this.props.destinationLocationGeo.latitude,
                  longitude: this.props.destinationLocationGeo.longitude
                }}
                ref={ref => this.destinationMarker = ref }
                >
                  <Callout type={'FINISH'} name={'Cieľ'} descriptionText={this.props.destinationName} />
              </MapView.Marker>

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
                      image={pointImg}>
                        <Callout {...point} descriptionText={this.parseDistance(parseFloat(point.distance_in_meters)) + ' od Vás'} />
                    </MapView.Marker>
                  );
                })
              }

              {/* DESTINATION STOPS */}
              {
                this.props.points.destination.map((point, i) => {
                  return (
                    <MapView.Marker
                      key={i}
                      coordinate={{
                        latitude: point.latitude,
                        longitude: point.longitude
                      }}
                      image={pointImg}>
                        <Callout {...point} descriptionText={this.parseDistance(parseFloat(point.distance_in_meters)) + ' do cieľa'}/>
                      </MapView.Marker>
                  );
                })
              }
              <Loading show={this.props.showLoading} text={this.props.loadingText} type={this.props.loadingType}/>
        </MapView>
      );
  }
}