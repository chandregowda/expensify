import expenseReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('Should add new Expense', () => {
	const state = expenseReducer(undefined, { type: '@@INIT' });
	expect(state).toEqual([]);
});

test('should remove expense by id', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: expenses[1].id
	};
	const state = expenseReducer(expenses, action);
	expect(state).toEqual([ expenses[0], expenses[2] ]);
});

test('should NOT remove when id does not match', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: '123'
	};
	const state = expenseReducer(expenses, action);
	expect(state).toEqual(expenses);
});

test('should add new expense', () => {
	const expense = {
		id: '2222',
		amount: 295,
		description: 'New One',
		note: '',
		createdAt: moment().subtract(2, 'days')
	};
	const action = {
		type: 'ADD_EXPENSE',
		expense
	};
	const state = expenseReducer(undefined, action);
	expect(state).toEqual([ expense ]);
});

test('Should edit expense', () => {
	const action = {
		type: 'EDIT_EXPENSE',
		id: expenses[1].id,
		updates: {
			amount: 8888
		}
	};
	const state = expenseReducer(expenses, action);
	expect(state[1].amount).toBe(8888);
});

test('Should NOT edit expense when wrong id is passed', () => {
	const action = {
		type: 'EDIT_EXPENSE',
		id: '-1',
		updates: {
			amount: 8888
		}
	};
	const state = expenseReducer(expenses, action);
	expect(state).toEqual(expenses);
});
