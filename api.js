import Constants from './Constants';

export function searchStops({user_location = {name, latitude, longitude}, destination = {name, latitude, longitude}} = {}){

	const user_location_uri = `user_location[name]=${encodeURIComponent(user_location.name)}&user_location[lat]=${user_location.latitude}&user_location[lng]=${user_location.longitude}`;
	const destination_uri = `destination[name]=${encodeURIComponent(destination.name)}&destination[lat]=${destination.latitude}&destination[lng]=${destination.longitude}`;
	
	const URL = `${Constants.FIND_STOPS}?${user_location_uri}&${destination_uri}&count=${Constants.STOPS_COUNT}`;

	return new Promise((resolve, reject) => {
            fetch(URL)
	            .then( res => res.json()) //parse response to JSON
	            .then( data => {
	            	if(data.status == "OK")
	            		resolve(data);
	            	else
	            		reject('Nepodarilo sa nájsť zastávky.');
	            })
	            .catch(err => reject(err));
        }
    );
}

export function geolocateUser({latitude, longitude} = {}){

	const URL = `${Constants.GEOLOCATE_USER}${latitude},${longitude}&key=${Constants.GAPI_KEY}`;
	
	return new Promise((resolve, reject) => {
            fetch(URL)
	            .then( res => res.json()) //parse response to JSON
	            .then( data => {
	            	if(data.status == "OK")
	            		resolve(data);
	            	else
	            		reject('Nepodarilo sa nájsť Vašu polohu');
	            })
	            .catch(err => reject(err));
        }
    );
}

const API = {
	searchStops,
	geolocateUser
};

export default API;