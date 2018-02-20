import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../../actions/filters';

test('Should set Text filter', () => {
	const action = setTextFilter();
	expect(action).toEqual({
		type: 'SET_TEXT_FILTER',
		text: ''
	});
});
test('Should set Text filter', () => {
	const action = setTextFilter('Bills');
	expect(action).toEqual({
		type: 'SET_TEXT_FILTER',
		text: 'Bills'
	});
});
test('Should set Sort By Date filter', () => {
	const action = sortByDate();
	expect(action).toEqual({
		type: 'SET_SORT_BY_DATE'
	});
});
test('Should set Sort By Amount filter', () => {
	const action = sortByAmount();
	expect(action).toEqual({
		type: 'SET_SORT_BY_AMOUNT'
	});
});
test('Should set Start Date default undefined', () => {
	const action = setStartDate();
	expect(action).toEqual({
		type: 'SET_START_DATE',
		startDate: undefined
	});
});
test('Should set Start Date with value', () => {
	const action = setStartDate(10000);
	expect(action).toEqual({
		type: 'SET_START_DATE',
		startDate: 10000
	});
});
test('Should set End Date default undefined', () => {
	const action = setEndDate();
	expect(action).toEqual({
		type: 'SET_END_DATE',
		endDate: undefined
	});
});
test('Should set Start Date with value', () => {
	const action = setEndDate(10000);
	expect(action).toEqual({
		type: 'SET_END_DATE',
		endDate: 10000
	});
});
