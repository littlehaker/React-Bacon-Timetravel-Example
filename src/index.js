import React from 'react';
import App from './App';
import h from 'react-hyperscript';
import Bacon from 'baconjs';
import { filterAction } from './util';

import timeTravel, { TimeTravelList, TimeTravelSlider } from './time-travel/index';

// Action
let action$ = new Bacon.Bus();

let count$ = Bacon.update(
    0,  // <-- Init value
    [action$.filter(filterAction('inc'))], (count, action) => count + action.payload.step,  // <-- Reducer
    [action$.filter(filterAction('dec'))], (count, action) => count - action.payload.step
);

// Store
let state$ = Bacon.combineTemplate({ // <-- Similar as combineReducers
    count: count$
});

let timetravel = timeTravel(state$, action$);
state$ = timetravel.state$;

React.render(h('div', [
    h(App, {state$, action$}),
    // TimeTravel widget
    h('hr'),
    h(TimeTravelSlider, {timetravel}),
    h('hr'),
    h(TimeTravelList, {timetravel})
]), document.getElementById('root'));
