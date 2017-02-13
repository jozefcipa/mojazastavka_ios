import React, {Component} from 'react';
import MapView from 'react-native-maps';
import Loading from './Loading';
import Constants from '../Constants';

export default class Map extends Component{

  constructor(props) {
    super(props);

    let map = null;
  }

  shouldComponentUpdate(nextProps){
    
    //merge points
    const allPoints = [...nextProps.points.nearby, ...nextProps.points.destination, nextProps.currentLocationGeo];

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

              {/* CURRENT USER LOCATION */}
              <MapView.Marker
                  coordinate={{
                    latitude: this.props.currentLocationGeo.latitude,
                    longitude: this.props.currentLocationGeo.longitude
                  }}
                  pinColor={'#FFE135'}
                  title={'Vaša poloha'}
                  description={this.props.currentName}
              />

              {/* DESTINATION LOCATION */}
              <MapView.Marker draggable onDragEnd={this.props.destinationPointMoved}
                  coordinate={{
                    latitude: this.props.destinationLocationGeo.latitude,
                    longitude: this.props.destinationLocationGeo.longitude
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