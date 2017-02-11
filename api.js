import Constants from './Constants';

export function searchStops({user_location = {name, lat, lng}, destination = {name, lat, lng}} = {}){

	const user_location_uri = `user_location[name]=${encodeURIComponent(user_location.name)}&user_location[lat]=${user_location.lat}&user_location[lng]=${user_location.lng}`;
	const destination_uri = `destination[name]=${encodeURIComponent(destination.name)}&destination[lat]=${destination.lat}&destination[lng]=${destination.lng}`;
	
	const URL = `${Constants.FIND_STOPS}?${user_location_uri}&${destination_uri}&count=${Constants.STOPS_COUNT}`;

	console.log(URL);
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

export function geolocateUser({lat, lng} = {}){

	const URL = `${Constants.GEOLOCATE_USER}${lat},${lng}&key=${Constants.GAPI_KEY}`;
	
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