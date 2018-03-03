import React from 'react';
import { shallow } from 'enzyme';

import { EditExpense } from '../../components/EditExpense';
import expenses from '../fixtures/expenses';

let editExpense, removeExpense, history, wrapper;

beforeEach(() => {
	editExpense = jest.fn();
	history = { push: jest.fn() };
	removeExpense = jest.fn();
	wrapper = shallow(
		<EditExpense editExpense={editExpense} removeExpense={removeExpense} history={history} expense={expenses[1]} />
	);
});

test('should render Edit Expenses', () => {
	expect(wrapper).toMatchSnapshot();
});

test('should Edit Expenses', () => {
	wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
	expect(history.push).toHaveBeenLastCalledWith('/');
	expect(editExpense).toHaveBeenLastCalledWith(expenses[1].id, expenses[1]);
});

test('should Remove Expenses', () => {
	wrapper.find('button').simulate('click');
	expect(history.push).toHaveBeenLastCalledWith('/');
	expect(removeExpense).toHaveBeenLastCalledWith({ id: expenses[1].id });
});
