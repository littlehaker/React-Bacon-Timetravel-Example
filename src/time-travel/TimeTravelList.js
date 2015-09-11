import React, { Component } from 'react';
import h from 'react-hyperscript';
import Bacon from 'baconjs';

export default class TimeTravelList extends Component {
    componentWillMount() {
        var state$ = Bacon.combineTemplate({
            actions: this.props.timetravel.actions$,
            states: this.props.timetravel.states$,
            index: this.props.timetravel.index$
        });
        this.unsubscribe = state$.onValue((state) => {
            this.setState(state);
        });
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    onClick(i) {
        this.props.timetravel.timelineAction$.push({type: 'goto', payload: {index: i}});
    }
    renderItem(item, i) {
        return h('li', {
            key: i,
            onClick: this.onClick.bind(this, i)
        }, [
            `Action ${item.type} ${JSON.stringify(item.payload)}  => Store ${JSON.stringify(this.state.states[i])}  ${i == this.state.index ? '<' : ''}`
        ]);
    }
    render() {
        return h('ol', [
            this.state.actions.map(this.renderItem.bind(this))
        ]);
    }
};
