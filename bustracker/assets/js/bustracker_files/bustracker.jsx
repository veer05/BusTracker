import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Nav from './nav';
//import Feed from './feed';
import Users from './users';
//import PostForm from './post-form';


export default function bustracker_init() {
  let root = document.getElementById('root');
  ReactDOM.render(<BusTracker />, root);
}

class BusTracker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      users: [],
    };

    this.request_users();
  }

  request_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        this.setState(_.extend(this.state, { users: resp.data }));
      },
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          		Please Work
          <Route path="/users" exact={true} render={() =>
            <Users users={this.state.users} />
          } />
        </div>
      </Router>
    );
  }
}
