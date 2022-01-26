import React from 'react';
import ReactDOM from 'react-dom';

class MyForm extends React.Component{

	constructor(props){
		super(props);

		this.state = {};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}

	handleChange(event){

		const target = event.target;
		const name = target.name;

		const value = target.type === 'checkbox' ? target.checked : target.value;

		this.setState({
			[name]: value
		});

	}

	handleSubmit(event){
		event.preventDefault();
	}

	handleReset(event){
		
		Object.keys(this.state).forEach((key) => {
			this.setState({
				[key]: ''
			})
		});

		this.refs.checkbox.checked = false;

	}

	render(){

		return(

			<form onSubmit={this.handleSubmit}>
				<label>
					Sample Size:
					<input 
						name="size"
						type="number" 
						value={this.state.size} 
						onChange={this.handleChange} />
				</label>
				<br />
				<label>
					Sample Mean:
					<input 
						name="mean"
						type="number" 
						value={this.state.mean} 
						onChange={this.handleChange} />
				</label>
				<br />
				<label>
					Standard deviation:
					<input 
						name="deviation"
						type="number" 
						value={this.state.deviation} 
						onChange={this.handleChange} />
				</label>
				<br />
				<label>
					<input 
						name="hypothesis"
						type="checkbox" 
						value={this.state.hypothesis} 
						onChange={this.handleChange} 
						ref="checkbox"/>
					Perform hypothesis test
				</label>
				<br />
				<label>
					Hypothesized mean:
					<input 
						name="hMean"
						type="number" 
						value={this.state.hMean} 
						onChange={this.handleChange}
						disabled={!this.state.hypothesis} />
				</label>
				<br />
				<input type="submit" value="Ok" />
				<input type="button" value="Reset" onClick={this.handleReset}/>
			</form>

		)

	}

}

ReactDOM.render(<MyForm />, document.getElementById('root'));