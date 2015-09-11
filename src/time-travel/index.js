import Bacon from 'baconjs';
import { filterAction } from '../util';

import TimeTravelList from './TimeTravelList';
import TimeTravelSlider from './TimeTravelSlider';

export default function timeTravel(state$, action$) {
    let states$ = state$.scan([], (states, state) => states.concat(state));
    let timelineAction$ = new Bacon.Bus();

    let actions$ = Bacon.update(
        [{type: '@@init', payload: {}}],
        [action$], (actions, action) => actions.concat(action)
    );

    let index$ = Bacon.update(
        0,
        [timelineAction$.filter(filterAction('goto'))], (index, timelineAction) => timelineAction.payload.index,
        [actions$, action$], (index, actions) => {
            if (index == actions.length - 2) {
                return actions.length - 1;
            } else {
                return index;
            }
        }
    );

    let computedState$ = Bacon.combineWith((states, index) =>  states[index], states$, index$);

    return {
        state$: computedState$,
        states$,
        index$,
        actions$,
        timelineAction$,
    };
};

export { TimeTravelSlider, TimeTravelList };
