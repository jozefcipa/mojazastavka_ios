import {actionTypes} from './ActionTypes';

const store = {

	// strings from inputs
	current_location: '',
	destination_location: '', 

	//from Google api
	geolocated_address: '',

	//current user position
	current_location_geo: {
		lat: '',
		lng: ''
	},

	//destination position
	destination_location_geo: {
		lat: '',
		lng: ''
	},

	//found stops in nearby of destination
	destination_stops: [],

	//found stops in user's nearby
	nearby_stops: [],

	//from which stop is highlighted route on map for destination stop
	selected_destination_stop: {
		lat: '',
		lng: ''
	},

	//from which stop is highlighted route on map for nearby stop
	selected_nearby_stop: {
		lat: '',
		lng: ''
	}
};

const reducer = (state = store, action) => {

  switch(action.type) {

    case actionTypes.USER_LOCATION_LOADED:
    	return {
	      	...state,
	      	current_location_geo: {
	      		lat: action.data.lat,
	      		lng: action.data.lng
	      }  
	  	};
    	break;

    case actionTypes.USER_POSITION_LOADED:
    	return {
	      	...state,
	      	geolocated_address: action.data.address,
	      	current_location_geo: {
	      		lat: action.data.lat,
	      		lng: action.data.lng
	      }      
      };
      break;
      
    case actionTypes.CURRENT_LOCATION_INPUT_CHANGED:
    	return {
	      	...state,
	      	current_location: action.data
      };
      break;

    case actionTypes.DESTINATION_LOCATION_INPUT_CHANGED:
    	return {
	      	...state,
	      	destination_location: action.data
      };
      break;

    case actionTypes.FOUND_STOPS:
    	return {
	      	...state,
	      	destination_stops: action.data.destination_stops,
	      	nearby_stops: action.data.nearby_stops,
	      	selected_destination_stop: action.data.destination_stops[0],
	      	selected_nearby_stop: action.data.nearby_stops[0]
      };
      break;
  }

  return state;
}

export default reducer;