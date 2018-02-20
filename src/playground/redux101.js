console.log('101');

import { createStore } from 'redux';

const incrementCount = ({ incrementBy = 1 } = {}) => ({
	type: 'INCREMENT',
	incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
	type: 'DECREMENT',
	decrementBy
});

const store = new createStore((state = { count: 0 }, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return { count: state.count + (typeof action.incrementBy === 'number' ? action.incrementBy : 1) };
		case 'DECREMENT':
			return { count: state.count - (typeof action.decrementBy === 'number' ? action.decrementBy : 1) };
		case 'RESET':
			return { count: 0 };
		default:
			return state;
	}
});

store.subscribe(() => {
	console.log(store.getState());
});

store.dispatch(incrementCount({ incrementBy: 100 }));

store.dispatch(decrementCount());

store.dispatch(decrementCount({ decrementBy: 50 }));
store.dispatch(decrementCount());
store.dispatch({
	type: 'RESET'
});
