import React from 'react';
import history from "./history";

function Temp1() {
    return (
      <div onClick={() => history.push('/temp2')}>
        TEMP1
      </div>
    );
  }
  
  export default Temp1;