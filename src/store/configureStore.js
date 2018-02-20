import { createStore, combineReducers } from 'redux';
import expenseReducer from '../reducers/expenses';
import filterReducer from '../reducers/filters';

export default () => {
	// Store Creation
	const store = new createStore(
		combineReducers({
			expenses: expenseReducer,
			filters: filterReducer
		}),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);

	return store;
};
