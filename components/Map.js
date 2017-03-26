import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { parseDistance, calculateToleranceCoords } from '../helpers';
import Loading from './Loading';
import Constants from '../Constants';
import pointImg from '../assets/point.png';
import busStop from '../assets/busStop.png';
import tramStop from '../assets/tramStop.png';
import finishImg from '../assets/finishPoint.png';
import userLocationImg from '../assets/userLocation.png';
import Callout from './Callout';
import isEqual from 'lodash.isequal';

export default class Map extends Component{

  constructor(props) {
    super(props);

    let map = null;
    let destinationMarker = null;
    let mapPoints = [];
  }

  shouldComponentUpdate(nextProps){

    if(nextProps.isMapBlocked){
      return false;
    }

    if(! isEqual(nextProps.mapCenterPoints, this.props.mapCenterPoints)){
      
      if(this.destinationMarker != null){
        this.destinationMarker.showCallout();
      }

      this.map.fitToCoordinates(nextProps.mapCenterPoints, { edgePadding: Constants.GEO.EDGE_PADDING, animated: true});
    }

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

              {/* START USER LOCATION image={userLocationImg}*/}
              {
                this.props.geolocatedAddress !== this.props.startName ? 
                  <MapView.Marker
                    coordinate={{
                      latitude: this.props.startLocationGeo.latitude,
                      longitude: this.props.startLocationGeo.longitude
                    }}
                    pinColor={'#19B5FE'}>
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
                pinColor={'#2ECC71'}
                ref={ref => this.destinationMarker = ref }>
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
                      image={pointImg}
                      onPress={() => {
                        this.props.selectStop(point.name);
                        this.props.showDirection(point.directions, Constants.NEARBY_DIRECTION);
                      }}>
                        <Callout {...point} descriptionText={parseDistance(parseFloat(point.distance_in_meters)) + ' od Vás'} />
                    </MapView.Marker>
                  );
                })
              }

              {/* SELECTED NEARBY DIRECTION */}
              <MapView.Polyline
                  coordinates={this.props.nearbyDirection}
                  strokeWidth={5}
                  strokeColor={'#19B5FE'}
              />

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
                      image={pointImg}
                      onPress={() => {
                        this.props.selectStop(point.name);
                        this.props.showDirection(point.directions, Constants.DESTINATION_DIRECTION)
                      }}>
                        <Callout {...point} descriptionText={parseDistance(parseFloat(point.distance_in_meters)) + ' do cieľa'}/>
                      </MapView.Marker>
                  );
                })
              }

              {/* SELECTED DESTINATION DIRECTION */}
              <MapView.Polyline
                  coordinates={this.props.destinationDirection}
                  strokeWidth={5}
                  strokeColor={'#2ECC71'}
              />
              <Loading show={this.props.showLoading} text={this.props.loadingText} type={this.props.loadingType}/>
        </MapView>
      );
  }
}