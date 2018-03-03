import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';
// Presentational Component
export const ExpenseList = (props) => (
	<div>
		{props.expenses.length === 0 ? (
			<p>No Expenses</p>
		) : (
			props.expenses.map((expense) => {
				return <ExpenseListItem key={expense.id} {...expense} />;
			})
		)}
	</div>
);

// Function that returns a new state that can be used as props
const mapStateToProps = (state) => {
	// This function can filter what information we need to get from the Store

	return {
		expenses: selectExpenses(state.expenses, state.filters)
	};
};
export default connect(mapStateToProps)(ExpenseList);

// // Wrapper HOC
// const ConnectedExpenseList = connect((state) => {
// 	// This function can filter what information we need to get from the Store
// 	return {
// 		expenses: state.expenses
// 	};
// })(ExpenseList);

// export default ConnectedExpenseList;
