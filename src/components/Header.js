import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
	return (
		<header>
			<h1>Expensify</h1>
			<nav className="nav-links">
				<NavLink exact activeClassName="is-active" to="/">
					Home
				</NavLink>
				<NavLink exact activeClassName="is-active" to="/add">
					Add
				</NavLink>
				<NavLink exact activeClassName="is-active" to="/help">
					Help
				</NavLink>
			</nav>
		</header>
	);
};

export default Header;
