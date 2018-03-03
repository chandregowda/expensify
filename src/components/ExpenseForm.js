import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
// import '../styles/components/react_dates_overrides.css';
import { SingleDatePicker } from 'react-dates';

export default class ExpenseForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			description: props.expense ? props.expense.description : '',
			amount: props.expense ? (props.expense.amount / 100).toString() : '',
			note: props.expense ? props.expense.note : '',
			createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
			calendarFocused: false,
			error: undefined
		};
	}

	handleDescriptionChange = (e) => {
		let description = e.target.value;
		this.setState(() => ({
			description
		}));
	};

	handleAmountChange = (e) => {
		let amount = e.target.value;
		if (amount.match(/^\d+(\.\d{0,2})?$/)) {
			amount = parseFloat(amount) ? amount : 0;
			this.setState(() => ({
				amount
			}));
		}
	};

	handleNoteChange = (e) => {
		let note = e.target.value;
		this.setState(() => ({
			note
		}));
	};

	handleDateChange = (createdAt) => {
		if (createdAt) {
			this.setState(() => ({
				createdAt
			}));
		}
	};

	handleFocusChanged = ({ focused }) => {
		this.setState(() => ({
			calendarFocused: focused
		}));
	};

	handleSubmit = (e) => {
		e.preventDefault();
		if (!this.state.description.trim() || !this.state.amount) {
			this.setState(() => {
				return {
					error: 'Please provide Description and Amount'
				};
			});
		} else {
			this.setState(() => {
				return {
					error: 'Successfully added expense.'
				};
			});
			setTimeout(() => {
				let that = this;
				this.setState(() => {
					return {
						error: undefined
					};
				});
			}, 3000);
			this.props.onSubmit({
				description: this.state.description,
				amount: parseFloat(this.state.amount, 10) * 100,
				createdAt: this.state.createdAt.valueOf(),
				note: this.state.note
			});
		}
	};
	render() {
		return (
			<div>
				{this.state.error && <p>{this.state.error}</p>}
				<form onSubmit={this.handleSubmit}>
					<div>
						<input
							type="text"
							placeholder="Description"
							required
							value={this.state.description}
							onChange={this.handleDescriptionChange}
						/>
					</div>
					<div>
						<input
							type="text"
							placeholder="Amount"
							required
							value={this.state.amount}
							onChange={this.handleAmountChange}
						/>
					</div>
					<div>
						<SingleDatePicker
							date={this.state.createdAt}
							onDateChange={this.handleDateChange}
							focused={this.state.calendarFocused}
							onFocusChange={this.handleFocusChanged}
							numberOfMonths={1}
							isOutsideRange={() => false}
						/>
					</div>
					<div>
						<textarea
							placeholder="Enter optional note"
							value={this.state.note}
							onChange={this.handleNoteChange}
						/>
					</div>
					<div>
						<button>Add</button>
					</div>
				</form>
			</div>
		);
	}
}
