import React from 'react';
import { Link } from 'react-router-dom';

const NoPageFound = () => (
	<p>
		404! Route not found - <Link to="/">Go Home</Link>
	</p>
);

export default NoPageFound;
