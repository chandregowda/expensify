import React from 'react';
import { shallow } from 'enzyme';
import NoPageFound from '../../components/NoPageFound';

test('should display 404 No Page found error', () => {
	const wrapper = shallow(<NoPageFound />);
	expect(wrapper).toMatchSnapshot();
});
