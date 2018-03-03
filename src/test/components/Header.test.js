import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';

test('Should render Header Component', () => {
	const warpper = shallow(<Header />);
	expect(warpper.find('h1').length).toBe(1);
	expect(warpper.find('h1').text()).toBe('Expensify');
	expect(warpper).toMatchSnapshot();
});
