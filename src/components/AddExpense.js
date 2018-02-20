import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { addExpense } from '../actions/expenses';

const AddExpense = (props) => (
	<div>
		<h2>Adding Expense</h2>
		<ExpenseForm
			onSubmit={(expense) => {
				console.log(expense);
				props.dispatch(addExpense(expense));
				props.history.push('/');
			}}
		/>
	</div>
);

export default connect()(AddExpense);
