import React from 'react';
import { shallow } from 'enzyme';

import { AddExpense } from '../../components/AddExpense';
import expenses from '../fixtures/expenses';

let addExpense, history, wrapper;

beforeEach(() => {
	addExpense = jest.fn();
	history = { push: jest.fn() };

	wrapper = shallow(<AddExpense addExpense={addExpense} history={history} />);
});

test('should render Add expenses on pate', () => {
	expect(wrapper).toMatchSnapshot();
});

test('should handle on Submit in AddExpense', () => {
	wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
	expect(history.push).toHaveBeenLastCalledWith('/');
	expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);
});
