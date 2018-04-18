import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { NavItem } from 'reactstrap';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';

function All_Routes(props) {

  let stops;
  function update(ev) { 
    let tgt = $(ev.target);

    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_FORM',
      data: data,
    };
    props.dispatch(action);
  }


  function submit(ev) {
    api.submit_stop(props.form);
  }

  console.log('In All routes Props', props)
  // TODO check on preload or on button click? Not sure
  if (props.stops_nearby.length > 0){
  stops = _.map(props.stops_nearby, (uu, ii) => <option key={ii}>{uu}</option>);}
  
  return(   
    <div style={{padding: "4ex", float: "right", width: "60%"}}>
      <h3>Stops closer to you</h3>
      <FormGroup>
          <Label for="stop_names">Select Stops</Label>
          <Input type="select" name="selected_stop" value={props.form.selected_stop} onChange={update}>
          <option></option>
              { stops }
          </Input>
      </FormGroup>
      <Button onClick={submit} color="primary">Check this Stop</Button> &nbsp;
    </div>);
}



function state2props(state) {
  return { 
  form: state.form, 
  stops_nearby: state.stops_nearby,
  };
}

export default connect(state2props)(All_Routes);