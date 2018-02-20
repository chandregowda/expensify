import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';

const Home = () => (
	<div>
		<p>Home Page</p>
		<hr />
		<ExpenseListFilters />
		<ExpenseList />
	</div>
);

export default Home;
