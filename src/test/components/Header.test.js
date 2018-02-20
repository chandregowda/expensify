import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

test('Should render Header Component', () => {
	const warpper = shallow(<Header />);
	expect(warpper.find('h1').length).toBe(1);
	expect(warpper.find('h1').text()).toBe('Expensify');
	expect(warpper).toMatchSnapshot();
	// const renderer = new ReactShallowRenderer();
	// renderer.render(<Header />);
	// expect(renderer.getRenderOutput()).toMatchSnapshot();
});
