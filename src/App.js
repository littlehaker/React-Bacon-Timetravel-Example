import React, { Component } from 'react';
import h from 'react-hyperscript';
import Bacon from 'baconjs';

export default class App extends Component {
    componentWillMount() {
        this.unsubscribe = this.props.state$.onValue((state) => {
            this.setState(state);
        });
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    dispatch(action_type, payload) {
        this.props.action$.push({
            type: action_type,
            payload: payload
        });
    }
    render() {
        return h('div', [
            h('span', 'Count: ' + this.state.count),
            h('button', {onClick: this.dispatch.bind(this, 'inc', {step: 10})}, '+'),
            h('button', {onClick: this.dispatch.bind(this, 'dec', {step: 1})}, '-'),
        ]);
    }
};
