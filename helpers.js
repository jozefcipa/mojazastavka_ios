import React from 'react';
import {Alert} from 'react-native';

export function validateInputs(startLocation, geolocatedAddress, destinationLocation){

  if(!startLocation && !geolocatedAddress){
    Alert.alert('Zadajte Vašu polohu.');
    return false;
  }

  if(!destinationLocation){
    Alert.alert('Zadajte cieľovú polohu.');
    return false;
  }

  return true;
}

export function parseDistance(distance){
	if(distance < 1000)
		return distance + 'm';
	else
		return (distance / 1000).toFixed(1) + 'km';
}

/**
*	Calculates 2 other points in radius of given coords to zoom out map
*/
export function calculateToleranceCoords(coords, radiusKm){

	return [
		{
			latitude: coords.latitude + (radiusKm / 6378) * (180 / Math.PI),
			longitude: coords.longitude + (radiusKm / 6478) * (180 / Math.PI)
		},
		{
			latitude: coords.latitude - (radiusKm / 6378) * (180 / Math.PI),
			longitude: coords.longitude - (radiusKm / 6478) * (180 / Math.PI)
		}
	];
}