import selectExpenses from '../../selectors/expenses';
import moment from 'moment';
import expenses from '../fixtures/expenses';

test('Should show all Expenses having "e"', () => {
	const result = selectExpenses(expenses, {
		text: 'e',
		sortBy: 'date',
		startDate: undefined,
		endDate: undefined
	});
	expect(result).toEqual([ expenses[2], expenses[0] ]);
});

test('Should show all Expenses sorted by Date', () => {
	const result = selectExpenses(expenses, {
		text: '',
		sortBy: 'date',
		startDate: undefined,
		endDate: undefined
	});
	expect(result).toEqual([ expenses[2], expenses[0], expenses[1] ]);
});

test('Should filter by Start Date', () => {
	const result = selectExpenses(expenses, {
		text: '',
		sortBy: 'date',
		startDate: moment(0),
		endDate: undefined
	});
	expect(result).toEqual([ expenses[2], expenses[0] ]);
});

test('Should filter by End Date', () => {
	const result = selectExpenses(expenses, {
		text: '',
		sortBy: 'date',
		startDate: undefined,
		endDate: moment(0)
	});
	expect(result).toEqual([ expenses[0], expenses[1] ]);
});

test('Should sort by Amount', () => {
	const result = selectExpenses(expenses, {
		text: '',
		sortBy: 'amount',
		startDate: undefined,
		endDate: undefined
	});
	expect(result).toEqual([ expenses[2], expenses[1], expenses[0] ]);
});
