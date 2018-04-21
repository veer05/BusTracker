import React from 'react';
import { Link } from 'react-router-dom';

function User(params) {
  return <p>{params.user.stop_name} - {params.user.arrival_time}</p>;
}

export default function Users(params) {
  console.log('This is users params',params)
  let users = _.map(params.users, (uu,ii) => <User key={ii} user={uu} />);
  return <div>
    { users }
  </div>;
}