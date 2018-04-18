import React from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';

export default function Hopefultry(props) {
  console.log('In Hopefultry Props', props)
  console.log(parseFloat(props.latitude))
  console.log(typeof props.latitude);
  console.log(typeof 42.34300530000001);
  let x = props.latitude  
  let y = props.longitude
  const GoogleMapExample = withGoogleMap(props => (  
      <GoogleMap
        defaultCenter = { { lat: x, lng: y } }
        defaultZoom = { 13 }
      >

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