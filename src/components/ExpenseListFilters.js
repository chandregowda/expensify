import React from 'react';
import 'react-dates/initialize';
// import DefaultTheme from 'react-dates/lib/theme/DefaultTheme';
// import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
// import { withStyles } from 'react-with-styles';
import { connect } from 'react-redux';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';
import uuid from 'uuid';

class ExpenseListFilters extends React.Component {
	state = {
		calendarFocused: null
	};
	handleDatesChange = ({ startDate, endDate }) => {
		this.props.dispatch(setStartDate(startDate));
		this.props.dispatch(setEndDate(endDate));
	};
	onFocusChange = (calendarFocused) => {
		this.setState(() => ({
			calendarFocused
		}));
	};
	render() {
		return (
			<div>
				<input
					type="text"
					placeholder="Search Description"
					value={this.props.filters.text}
					onChange={(e) => {
						this.props.dispatch(setTextFilter(e.target.value));
					}}
				/>
				<select
					value={this.props.filters.sortBy}
					onChange={(e) => {
						if (e.target.value === 'date') {
							this.props.dispatch(sortByDate());
						} else {
							this.props.dispatch(sortByAmount());
						}
					}}
				>
					<option value="date">Date</option>
					<option value="amount">Amount</option>
				</select>
				<DateRangePicker
					startDate={this.props.filters.startDate}
					startDateId={uuid()} // PropTypes.string.isRequired,
					endDate={this.props.filters.endDate}
					endDateId={uuid()} // PropTypes.string.isRequired,
					onDatesChange={this.handleDatesChange}
					focusedInput={this.state.calendarFocused}
					onFocusChange={this.onFocusChange}
					showClearDates={true}
					numberOfMonths={1}
					isOutsideRange={() => false}
				/>
			</div>
		);
	}
}
const mapStateToProps = (state, filters) => {
	return {
		filters: state.filters
	};
};
export default connect(mapStateToProps)(ExpenseListFilters);
