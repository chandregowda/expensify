import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

export class EditExpense extends React.Component {
	onSubmit = (expense) => {
		this.props.editExpense(this.props.expense.id, expense);
		this.props.history.push('/');
	};

	onRemove = () => {
		this.props.removeExpense({ id: this.props.expense.id });
		this.props.history.push('/');
	};

	render() {
		return (
			<div>
				<ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
				<button onClick={this.onRemove}>Remove</button>
			</div>
		);
	}
}
const mapDispatchToProps = (dispatch, props) => {
	return {
		editExpense: (id, expense) => dispatch(editExpense(id, expense)),
		removeExpense: (id) => dispatch(removeExpense({ id }))
	};
};

/*
const EditExpense = (props) => {
	return (
		<div>
			<h2>Editing Expense</h2>
			<ExpenseForm
				expense={props.expense}
				onSubmit={(expense) => {
					console.log(expense);
					props.dispatch(editExpense(props.expense.id, expense));
					props.history.push('/');
				}}
			/>
			<button
				onClick={(e) => {
					props.dispatch(removeExpense({ id: props.expense.id }));
					props.history.push('/');
				}}
			>
				Remove
			</button>
		</div>
	);
};
*/
const mapStateToProps = (state, props) => {
	return {
		expense: state.expenses.find((expense) => expense.id === props.match.params.id)
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(EditExpense);
