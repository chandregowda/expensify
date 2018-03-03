import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm.js';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('should render expense default form', () => {
	const wrapper = shallow(<ExpenseForm />);
	expect(wrapper).toMatchSnapshot();
});

test('should render expense form with expense data', () => {
	const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
	expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
	const wrapper = shallow(<ExpenseForm />);

	expect(wrapper).toMatchSnapshot(); // take snapshot before submiting

	wrapper.find('form').simulate('submit', {
		preventDefault: () => {}
	});
	expect(wrapper.state('error').length).toBeGreaterThan(0);
	expect(wrapper).toMatchSnapshot(); // take snapshot after rendering
});

test('should set description on input change', () => {
	const wrapper = shallow(<ExpenseForm />);
	const value = 'Test description';
	wrapper.find('input').at(0).simulate('change', {
		target: { value }
	});
	expect(wrapper.state('description')).toBe(value);
});

test('should set note on input change', () => {
	const wrapper = shallow(<ExpenseForm />);
	const value = 'Test Note content';
	wrapper.find('textarea').simulate('change', {
		target: { value }
	});
	expect(wrapper.state('note')).toBe(value);
});

test('should set amount on input change', () => {
	const wrapper = shallow(<ExpenseForm />);
	const value = '100.9';
	wrapper.find('input').at(1).simulate('change', {
		target: { value }
	});
	expect(wrapper.state('amount')).toBe(value);
});

test('should set error if wrong amount is passed', () => {
	const wrapper = shallow(<ExpenseForm />);
	const value = '100.9999';
	wrapper.find('input').at(1).simulate('change', {
		target: { value }
	});
	expect(wrapper.state('amount')).toBe('');
});

test('should submit form on valid input submission', () => {
	const onSubmitSpy = jest.fn();

	const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
	wrapper.find('form').simulate('submit', {
		preventDefault: () => {}
	});
	expect(wrapper.state('error')).toBe('Successfully added expense.');
	let { description, note, createdAt, amount } = expenses[0];
	expect(onSubmitSpy).toHaveBeenCalledWith({ description, note, createdAt, amount });
});

test('should set createdAt onChange of Date', () => {
	const now = moment();
	const wrapper = shallow(<ExpenseForm />);
	// wrapper.find('#date').prop('onDateChange')(now);
	wrapper.find('#date').prop('onDateChange')(now);
	expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendarFocused on Focus change', () => {
	const focused = true;
	const wrapper = shallow(<ExpenseForm />);
	wrapper.find('#date').prop('onFocusChange')({ focused });
	expect(wrapper.state('calendarFocused')).toBe(focused);
});
