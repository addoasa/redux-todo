import React from 'react';
import '../style/LastItemDisplay.css';

// ------------------------------------------------------
// Since this component doesn't have access to TodoDisplay.js's state...
// this component doesn't know what the last item added was. 
// Redux can help fix this .
// ------------------------------------------------------

class LastItemDisplay extends React.Component {
    constructor(){
        super()
        this.state = {
           
        }
    }
  render(){


      return (
        <div id="last-item-display">
          The last item added goes in here:
        </div>
    );
  }
}

export default LastItemDisplay;