import moment from 'moment';

export default [
	{ id: '1', description: 'One', note: 'buck', amount: 10, createdAt: 0 },
	{ id: '2', description: 'Two', note: '', amount: 900, createdAt: moment(0).subtract(4, 'days').valueOf() },
	{ id: '3', description: 'Three', note: '', amount: 4500, createdAt: moment(0).add(4, 'days').valueOf() }
];
