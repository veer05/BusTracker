import React from 'react';
import { Link } from 'react-router-dom';

function Schedule(params) {
  return <p>{params.schedules.stopName} - {params.schedules.arrival_time}</p>;
}

export default function Custom_Schedule(params) {
  console.log('This is custom_schdule params',params)
  let users = _.map(params.bus, (uu,ii) => <Schedule key={ii} schedules={uu} />);
  return <div>
    { users }
  </div>;
}