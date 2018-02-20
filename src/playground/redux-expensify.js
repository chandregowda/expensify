import { createStore, combineReducers } from 'redux';

import uuid from 'uuid';

console.log('Combined Reducers.');

const addExpense = (
	{ description = '', note = '', startDate = undefined, endDate = undefined, amount = 0, createdAt = 0 } = {}
) => {
	return {
		type: 'ADD_EXPENSE',
		expense: {
			id: uuid(),
			description,
			note,
			amount,
			createdAt
		}
	};
};

const removeExpense = ({ id }) => ({
	type: 'REMOVE_EXPENSE',
	id
});

const editExpense = (id, updates) => ({
	type: 'EDIT_EXPENSE',
	id,
	updates
});

const setTextFilter = (text = '') => ({
	type: 'SET_TEXT_FILTER',
	text
});

const sortByDate = () => ({
	type: 'SET_SORT_BY_DATE'
});

const sortByAmount = () => ({
	type: 'SET_SORT_BY_AMOUNT'
});

const setStartDate = (startDate) => ({
	type: 'SET_START_DATE',
	startDate
});
const setEndDate = (endDate) => ({
	type: 'SET_END_DATE',
	endDate
});

const expenseReducerDefaultState = [];

const expenseReducer = (state = expenseReducerDefaultState, action) => {
	switch (action.type) {
		case 'ADD_EXPENSE':
			return [ ...state, action.expense ];
		case 'REMOVE_EXPENSE':
			return state.filter((item) => {
				return item.id !== action.id;
			});
		case 'EDIT_EXPENSE':
			return state.map((item) => {
				if (item.id === action.id) {
					return { ...item, ...action.updates };
				} else {
					return item;
				}
			});
		default:
			return state;
	}
};

const filterReducerDefaultState = {
	text: '',
	sortBy: 'date',
	startDate: undefined,
	endDate: undefined
};
const filterReducer = (state = filterReducerDefaultState, action) => {
	switch (action.type) {
		case 'SET_TEXT_FILTER':
			return { ...state, text: action.text };
		case 'SET_SORT_BY_DATE':
			return { ...state, sortBy: 'date' };
		case 'SET_SORT_BY_AMOUNT':
			return { ...state, sortBy: 'amount' };
		case 'SET_START_DATE':
			return { ...state, startDate: action.startDate };
		case 'SET_END_DATE':
			return { ...state, endDate: action.endDate };
		default:
			return state;
	}
};

// Get Visible expenses
const getVisibleExpenses = (expenses, { text = undefined, sortBy = undefined, startDate, endDate }) => {
	return expenses
		.filter((expense) => {
			const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
			const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
			const textMatch =
				typeof text !== 'string' || expense.description.toLowerCase().includes(text.toLowerCase());
			return startDateMatch && endDateMatch && textMatch;
		})
		.sort((a, b) => {
			if (sortBy === 'date') {
				return a.createdAt < b.createdAt ? 1 : -1;
			} else {
				return a.amount < b.amount ? 1 : -1;
			}
		});
};

const store = new createStore(
	combineReducers({
		expenses: expenseReducer,
		filters: filterReducer
	})
);

store.subscribe(() => {
	const state = store.getState();
	console.log(state);
	const visibleExpeses = getVisibleExpenses(state.expenses, state.filters);
	console.log(visibleExpeses);
});

const one = store.dispatch(addExpense({ description: 'One', amount: 3, createdAt: 1000 }));
const coffee = store.dispatch(addExpense({ description: 'coffee', amount: 30, createdAt: 5000 }));
const rent = store.dispatch(addExpense({ description: 'Rent', amount: 9530, createdAt: 200 }));

// store.dispatch(removeExpense({ id: one.expenses.id }));
// store.dispatch(editExpense(coffee.expenses.id, { amount: 99 }));

// store.dispatch(setTextFilter('fee'));
// store.dispatch(setTextFilter(''));

store.dispatch(sortByAmount());
store.dispatch(sortByDate());

// store.dispatch(setStartDate(1239));
// // store.dispatch(setStartDate());
// store.dispatch(setEndDate(500));

// const demoState = {
// 	expenses: [
// 		{
// 			id: '1324sdfas',
// 			description: 'some rent paid to owner',
// 			note: 'Something to note about rent',
// 			amount: 55000,
// 			createdAt: 0
// 		}
// 	],
// 	filters: {
// 		text: 'rent',
// 		sortBy: 'amount', // amount or date
// 		startDate: undefined,
// 		endDate: undefined
// 	}
// };
