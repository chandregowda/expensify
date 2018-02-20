import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import Header from '../components/Header';
import Home from '../components/Home';
import AddExpense from '../components/AddExpense';
import EditExpense from '../components/EditExpense';
import Help from '../components/Help';
import FourZeroFour from '../components/FourZeroFour';

const AppRouter = () => (
	<BrowserRouter>
		<div>
			<Header />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/add" component={AddExpense} />
				<Route exact path="/edit/:id" component={EditExpense} />
				<Route exact path="/help" component={Help} />
				<Route component={FourZeroFour} />
			</Switch>
		</div>
	</BrowserRouter>
);

export default AppRouter;
