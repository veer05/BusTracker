import React from 'react';
import { Link } from 'react-router-dom';

function User(params) {
  return(<tr>
          	<td><p> { params.user.stop_name}</p></td>
          	<td><p> { params.user.arrival_time} </p></td>
          	</tr>); ;
}

export default function Users(params) {
  console.log('This is users params',params)
  let users = _.map(params.users, (uu,ii) => <User key={ii} user={uu} />);
  return( <div className="tablestart">
   <p>Bus Schedule</p>
    <table className="tablestyle">
  
  <tbody>
    <tr>
      <th>Stop Name</th>
      <th>Arrival Time</th>
    </tr>
      { users }
    </tbody>
  </table></div>);
}