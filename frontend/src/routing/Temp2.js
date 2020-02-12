import React from 'react';
import history from "./history";

function Temp2() {
    return (
      <div onClick={() => history.push('/')}>
        TEMP2
      </div>
    );
  }
  
  export default Temp2;