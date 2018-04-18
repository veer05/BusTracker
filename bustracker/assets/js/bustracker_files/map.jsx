import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

export default function Map(props) {
  let lat = props.latitude  
  let lon = props.longitude
  const GoogleMapExample = withGoogleMap(props => (  
      <GoogleMap
        defaultCenter = { { lat: lat, lng: lon } }
        defaultZoom = { 13 }
      >
        {<Marker position = {{ lat: lat, lng: lon }} />}
      </GoogleMap>
   ));

  return (
    <div>
        <GoogleMapExample
          containerElement={ <div style={{ height: `500px`, width: '500px' }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        />
    </div>
  );
}