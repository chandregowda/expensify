import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('Sould create Remove expense', () => {
	const action = removeExpense({ id: '123abc' });
	expect(action).toEqual({
		type: 'REMOVE_EXPENSE',
		id: '123abc'
	});
});

test('Sould create Edit expense', () => {
	const action = editExpense('123abc', {
		description: 'AAAA'
	});
	expect(action).toEqual({
		type: 'EDIT_EXPENSE',
		id: '123abc',
		updates: {
			description: 'AAAA'
		}
	});
});

test('Sould create Add expense with default', () => {
	const expense = {
		description: '',
		note: '',
		amount: 0,
		createdAt: 0
	};

	const action = addExpense(); // Nothing is passed
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			...expense,
			id: expect.any(String)
		}
	});
});

test('Sould create Add expense with some value', () => {
	const expense = {
		description: 'AAAA',
		note: 'BBBB',
		amount: 1110,
		createdAt: 2220
	};

	const action = addExpense(expense); // Data is passed
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			...expense,
			id: expect.any(String)
		}
	});
});
