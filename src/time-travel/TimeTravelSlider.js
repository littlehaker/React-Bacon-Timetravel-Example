import React, { Component } from 'react';
import h from 'react-hyperscript';
import Bacon from 'baconjs';

export default class TimeTravelSlider extends Component {
    componentWillMount() {
        let state$ = Bacon.combineTemplate({
            actions: this.props.timetravel.actions$,
            index: this.props.timetravel.index$
        });
        this.unsubscribe = state$.onValue((state) => this.setState(state));
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    onChange(e) {
        this.props.timetravel.timelineAction$.push({
            type: 'goto',
            payload: {
                index: e.currentTarget.value
            }
        });
    }
    render() {
        return h('div', [
            h('input', {type: 'range', min: 0, max: this.state.actions.length - 1, value: this.state.index, onChange: this.onChange.bind(this)})
        ]);
    }
};
