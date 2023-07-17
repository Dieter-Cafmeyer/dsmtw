import React from 'react';
import {Match, BrowserRouter as Router} from 'react-router';
//import {Router, Route, hashHistory} from 'react-router';

import {Home, Game, First} from '../pages/';

const App = () => {

  localStorage.setItem(`language`, `nl-NL`);

  return (
    <Router>
      <main>

        <Match
            exactly pattern='/'
            render={() => (<Home />)}
        />

        <Match
            exactly pattern='/game'
            component={Game}
        />

        <Match
            exactly pattern='/first'
            component={First}
        />

      </main>
    </Router>
  );
};



/*

      <Match
          exactly pattern='/'
          render={Home}
        />


const App = () => {
  return (
    <Router>
      <main>
        <Route path='/' component={Home} />
      </main>
    </Router>
  );
};
*/

export default App;
