import React, {Component} from 'react';

import HomePage from './HomePage';

// import {Lala} from '../api/lala';
// import { withTracker } from 'meteor/react-meteor-data';


export default class App extends Component {
  render() {
    return (
      <div>
        <HomePage user="Naomi"/>
      </div>
    );
  }
}

// export default withTracker(() => {
//     return {
//       lala: Lala.find({}).fetch(),
//     };
//   })(App);
  
 