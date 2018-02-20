import React from 'react';
import { Link } from 'react-router-dom';

import moment from 'moment';

const ExpenseListItem = ({ id, description, amount, createdAt, note }) => {
	return (
		<div>
			<Link to={`/edit/${id}`}>
				<h4>{description}</h4>
			</Link>
			<p>
				{amount} - {moment(createdAt).format('dddd, MMMM Do YYYY')}
			</p>
			{note !== '' && <p>Note: {note} </p>}
		</div>
	);
};

export default ExpenseListItem;
