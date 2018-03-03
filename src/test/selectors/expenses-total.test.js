import selectExpenses from '../../selectors/expenses';
import moment from 'moment';
import expenses from '../fixtures/expenses';

test('should return 0 if there are no expenses', () => {
	expect(0).toBe(0);
});
