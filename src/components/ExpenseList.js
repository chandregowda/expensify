import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';
// Presentational Component
const ExpenseList = (props) => (
	<div>
		<h3>Expense List</h3>
		{props.expenses.map((expense) => {
			return <ExpenseListItem key={expense.id} {...expense} />;
		})}
	</div>
);

// // Wrapper HOC
// const ConnectedExpenseList = connect((state) => {
// 	// This function can filter what information we need to get from the Store
// 	return {
// 		expenses: state.expenses
// 	};
// })(ExpenseList);

// export default ConnectedExpenseList;

// Function that returns a new state that can be used as props
const mapStateToProps = (state) => {
	// This function can filter what information we need to get from the Store

	return {
		expenses: selectExpenses(state.expenses, state.filters)
	};
};
export default connect(mapStateToProps)(ExpenseList);
