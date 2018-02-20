/**
 * Higher Order Components (HOC)
 */
console.log('Higher Order Component');

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
	<div>
		<h1>Higher Order Component</h1>
		<p>Information: {props.info}</p>
	</div>
);

const withAdminWarning = (WrappedComponent) => {
	return (props) => (
		<div>
			{props.isAdmin && <p>This is the warning...</p>}
			<WrappedComponent {...props} />
		</div>
	);
};

const requireAuthentication = (WrappedComponent) => {
	return (props) => <div>{props.isAuthenticated ? <WrappedComponent {...props} /> : <p>Please login</p>}</div>;
};
const AdminInfo = withAdminWarning(Info);
console.log(AdminInfo);
const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(<AdminInfo isAdmin={true} info="Some Information" />, document.getElementById('root'));
ReactDOM.render(
	<AuthInfo isAuthenticated={false} isAdmin={true} info="Some Information" />,
	document.getElementById('root')
);
