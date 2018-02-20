/**
 * This is main app.js
 * babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch
 */

console.log('App.js is running');

// JSX
const Header = (props) => {
	return (
		<div>
			<h1>{props.title}</h1>
			<h2>{props.subTitle}</h2>
		</div>
	);
};

const Action = (props) => {
	return (
		<button disabled={props.hasOptions === 0} onClick={props.handleActionClick}>
			What can I do?
		</button>
	);
};

const Option = (props) => {
	return (
		<div>
			<p>
				<span>{props.itemName} </span>
				<button
					onClick={() => {
						props.handleRemoveSingleOption(props.itemName);
					}}
				>
					Delete
				</button>
			</p>
		</div>
	);
};

const Options = (props) => {
	return (
		<div>
			<button disabled={props.options.length === 0} onClick={props.handleRemoveAllOptions}>
				Remove All Options
			</button>
			There are {props.options.length} items to select
			{props.options.map((item) => (
				<Option key={item} itemName={item} handleRemoveSingleOption={props.handleRemoveSingleOption} />
			))}
		</div>
	);
};

class AddOption extends React.Component {
	constructor(props) {
		super(props);
		this.handleAddNewOption = this.handleAddNewOption.bind(this);
		this.state = {
			error: undefined
		};
	}

	handleAddNewOption(e) {
		e.preventDefault();
		let newOption = e.target.newOption.value.trim();
		if (newOption) {
			console.log('Adding new option', newOption);
			e.target.newOption.value = '';
			let error = this.props.handleAddOption(newOption);
			this.setState(() => ({ error }));
		} else {
			console.log('Empty option');
		}
	}
	render() {
		return (
			<div>
				{this.state.error && <p> {this.state.error}</p>}
				<form onSubmit={this.handleAddNewOption}>
					<input type="text" name="newOption" />
					<button>Add new option</button>
				</form>
			</div>
		);
	}
}

class MyDecission extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			options: [],
			currentOption: -1
		};
		this.handleRemoveAllOptions = this.handleRemoveAllOptions.bind(this);
		this.handleActionClick = this.handleActionClick.bind(this);
		this.handleAddOption = this.handleAddOption.bind(this);
		this.handleRemoveSingleOption = this.handleRemoveSingleOption.bind(this);
	}

	handleActionClick() {
		this.setState(() => {
			return {
				currentOption: Math.floor(Math.random() * this.state.options.length)
			};
		});
	}
	handleRemoveAllOptions() {
		this.setState(() => {
			return {
				options: []
			};
		});
	}
	handleRemoveSingleOption(optionToRemove) {
		this.setState((prevState) => {
			return {
				options: prevState.options.filter((option) => optionToRemove !== option)
			};
		});
	}
	handleAddOption(option) {
		if (!option.trim()) return 'Empty option';
		if (this.state.options.indexOf(option) > -1) return `'${option}' already exists`;
		this.setState((prevState) => {
			return {
				options: prevState.options.concat([ option ])
			};
		});
	}

	render() {
		// const options = [ 'Opt One', 'Opt two', 'Opt three' ];
		return (
			<div>
				<Header title="My Decission App" subTitle="Is that so???" />
				<div>
					<Action hasOptions={this.state.options.length} handleActionClick={this.handleActionClick} />
					{this.state.currentOption !== -1 &&
					this.state.options.length > 0 && (
						<span> You can do : {this.state.options[this.state.currentOption]}</span>
					)}
				</div>
				<AddOption handleAddOption={this.handleAddOption} />
				<Options
					options={this.state.options}
					handleRemoveAllOptions={this.handleRemoveAllOptions}
					handleRemoveSingleOption={this.handleRemoveSingleOption}
				/>
				<hr />
				<Counter />
			</div>
		);
	}
}

class Counter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 0
		};
		this.handleAddClick = this.handleAddClick.bind(this);
		this.handleSubClick = this.handleSubClick.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}

	componentDidMount() {
		console.log('Counter Mounted');
		if (localStorage.getItem('count')) {
			let count = parseInt(localStorage.getItem('count')) || 0;
			this.setState(() => ({
				count
			}));
		}
	}
	componentDidUpdate(prevProps, prevState) {
		console.log(`prevState.count : ${prevState.count}, this.state.count : ${this.state.count}`);
		if (prevState.count !== this.state.count) {
			localStorage.setItem('count', this.state.count);
			console.log('COunter updated to localstorage');
		}
	}

	handleAddClick() {
		console.log('Add Clicked');
		this.setState((prevState) => {
			return { count: prevState.count + 1 };
		});
	}

	handleSubClick() {
		console.log('Sub Clicked');

		this.setState((prevState) => {
			return { count: prevState.count - 1 };
		});
	}

	handleReset() {
		console.log('Reset Clicked');

		this.setState((prevState) => {
			return { count: 0 };
		});
	}

	render() {
		return (
			<div>
				<h3>Count : {this.state.count}</h3>
				<button onClick={this.handleAddClick}>Add 1</button>
				<button onClick={this.handleSubClick}>Sub 1</button>
				<button onClick={this.handleReset}>Reset</button>
			</div>
		);
	}
}

// Counter.defaultProps = {
// 	count: 100
// };
class VisibleToggle extends React.Component {
	constructor(props) {
		super(props);
		this.handleToggle = this.handleToggle.bind(this);
		this.state = {
			isVisible: false
		};
	}

	handleToggle() {
		this.setState((prevState) => {
			return {
				isVisible: !prevState.isVisible
			};
		});
	}

	render() {
		return (
			<div>
				<button onClick={this.handleToggle}>{this.state.isVisible ? 'Hide' : 'Show'} Text</button>
				{this.state.isVisible && <span> Am I visible???? </span>}
			</div>
		);
	}
}

ReactDOM.render(<MyDecission />, document.getElementById('root'));
