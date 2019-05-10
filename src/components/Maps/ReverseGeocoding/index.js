import React from 'react'
import { writeLocationPrivateData } from '../../../Firbase/writeData'



export function geocodeLatLng(userId, latlng) {
    const geocoder = new window.google.maps.Geocoder;

    geocoder.geocode({ 'location': latlng }, function (results, status) {
        if (status === 'OK') {
            if (results[0]) {
                const formatted_address = results[0].formatted_address
                const place_id = results[0].place_id
                console.log(results);

                writeLocationPrivateData(userId, latlng, formatted_address, place_id)
            } else {
                window.alert('No results found');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
}