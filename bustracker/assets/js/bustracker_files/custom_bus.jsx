import React from 'react';
import SingleCustomBus from './single_custom_bus';

export default function Custom_Bus(params) {

  let busses = _.map(params.busses, (pp, ii) => <SingleCustomBus key={ii} bus={pp} />);
  return <table>
  <tbody>
  	<tr>
  		<th>Route No. </th>
		<th>Source Departure</th>
		<th>Source Stop Name</th>
    <th>Destination Stop Name</th>
    <th>Destination Arrival Time</th>
  	</tr>
    	{ busses }
   	</tbody>
  </table>;
}