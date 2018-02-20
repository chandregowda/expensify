import moment from 'moment';

// Get Visible expenses
export default (expenses, { text = undefined, sortBy = undefined, startDate, endDate }) => {
	return expenses
		.filter((expense) => {
			const createdAtMoment = moment(expense.createdAt);
			const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
			const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
			const textMatch =
				typeof text !== 'string' || expense.description.toLowerCase().includes(text.toLowerCase());
			return startDateMatch && endDateMatch && textMatch;
		})
		.sort((a, b) => {
			console.log('SORT BY: ', sortBy);
			if (sortBy === 'date') {
				// console.log(`Sorting by date : ${a.createdAt} and ${b.createdAt}`);
				// console.log(a);
				// console.log(b);
				return a.createdAt < b.createdAt ? 1 : -1;
			} else {
				console.log(`Sorting by amount : ${a.amount} and ${b.amount}`);
				return a.amount < b.amount ? 1 : -1;
			}
		});
};
