import moment from 'moment';
import filterReducer from '../../reducers/filters';

test('Should set default filters', () => {
	const state = filterReducer(undefined, { type: '@@INIT' });
	expect(state).toEqual({
		text: '',
		sortBy: 'date',
		startDate: moment().startOf('month'),
		endDate: moment().endOf('month')
	});
});

test('Should set sortBy to amount', () => {
	const state = filterReducer(undefined, { type: 'SET_SORT_BY_AMOUNT' });
	expect(state.sortBy).toBe('amount');
});

test('Should set sortBy to date', () => {
	const currentState = {
		text: '',
		startDate: undefined,
		endDate: undefined,
		sortBy: 'amount'
	};
	const action = {
		type: 'SET_SORT_BY_DATE'
	};
	const state = filterReducer(currentState, action);
	expect(state.sortBy).toBe('date');
});

test('Should set text filter', () => {
	const state = filterReducer(undefined, {
		type: 'SET_TEXT_FILTER',
		text: 'Something'
	});
	expect(state.text).toBe('Something');
});

test('Should set Start Date filter', () => {
	const state = filterReducer(undefined, {
		type: 'SET_START_DATE',
		startDate: -1000
	});
	expect(state.startDate).toBe(-1000);
});

test('Should set End Date filter', () => {
	const state = filterReducer(undefined, {
		type: 'SET_END_DATE',
		endDate: 1000
	});
	expect(state.endDate).toBe(1000);
});
