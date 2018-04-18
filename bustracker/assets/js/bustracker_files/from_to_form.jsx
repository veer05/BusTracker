import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { NavItem } from 'reactstrap';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';


function From_To_Form(props) {

  let stops;

  function update(ev) { 
    let tgt = $(ev.target);

    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_SRCDEST_FORM',
      data: data,
    };
    props.dispatch(action);
  }


  function submit(ev) {
    let data = {};
    data['display_flag'] = true;
    let action = {
      type: 'UPDATE_SRCDEST_FORM',
      data: data,
    };
    props.dispatch(action);
    console.log('This is source and destination', props.srcdest_form) 
    //api.submit_stop(props.form);
  }

  console.log('In SRC_TO_DESTINATION Props', props)
  // TODO check on preload or on button click? Not sure
  stops = _.map(props.allStops, (uu, ii) => <option key={ii}>{uu.stop_name}</option>);
  
  return(   
    <div style={{padding: "2ex", float: "left"}}>
      <FormGroup>
          <Label for="allStops">Source</Label>
          <Input type="select" name="source_stop" value={props.srcdest_form.source_stop} onChange={update}>
          <option></option>
              { stops }
          </Input>
          <Label for="allStops">Destination</Label>
          <Input type="select" name="destination_stop" value={props.srcdest_form.destination_stop} onChange={update}>
          <option></option>
              { stops }
          </Input>
      </FormGroup>
      <Button onClick={submit} color="primary">Check this Stop</Button> &nbsp;
    </div>);
}



function state2props(state) {
  return { 
  srcdest_form: state.srcdest_form, 
  allStops: state.allStops,
  };
}

export default connect(state2props)(From_To_Form);