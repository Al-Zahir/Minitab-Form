// imports
import React from 'react';
import ReactDOM from 'react-dom';

// The form class
class MyForm extends React.Component{

	constructor(props){
		super(props);

		this.state = {}; // init the state to empty

		// bind all the handle functions to this
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}

	// Whenever a value is changed
	handleChange(event){

		// We want to get the name of the component changed
		const target = event.target;
		const name = target.name;

		// Get the correct value based on number or checkbox
		const value = target.type === 'checkbox' ? target.checked : target.value;

		// set the state
		this.setState({
			[name]: value,
			formValid: false // we set the form to invalid in case a change was made after rendering the table
		});

	}

	// On submit, if we were able to submit, the form should be valid
	handleSubmit(event){
		event.preventDefault();
		this.setState({"formValid": true});
	}

	// On reset
	handleReset(event){
		
		// reset all the keys to clear out the input fields
		// this will also reset formValid
		Object.keys(this.state).forEach((key) => {
			this.setState({
				[key]: ''
			})
		});

		// uncheck the checkbox
		this.refs.checkbox.checked = false;
	}

	// will display the table
	renderTable(){

		// used to display the last row
		let h = this.state.hypothesis;

		return (
			<div id="Table">
				<table>
					<tr>
						<th>Sample Size:</th>
						<th>{parseInt(this.state.size)}</th>
					</tr>
					<tr>
						<th>Sample Mean:</th>
						<th>{parseFloat(this.state.mean)}</th>
					</tr>
					<tr>
						<th>Standard deviation:</th>
						<th>{parseFloat(this.state.deviation)}</th>
					</tr>
					{h ? this.renderHMean() : ''}
				</table>
			</div>
		);

	}

	// renders the last row
	renderHMean(){

		return(

			<tr>
				<th>Hypothesized mean:</th>
				<th>{parseFloat(this.state.hMean)}</th>
			</tr>

		);

	}

	// the main render function
	render(){

		return(

			<div id="form">

				<form onSubmit={this.handleSubmit}>
					<label>
						Sample Size:
						<input 
							name="size"
							type="number"
							min="2" // at least 2
							value={this.state.size} 
							onChange={this.handleChange} 
							required/>
					</label>
					<br />
					<label>
						Sample Mean:
						<input 
							name="mean"
							type="number" 
							step="any" // float
							value={this.state.mean} 
							onChange={this.handleChange} 
							required/>
					</label>
					<br />
					<label>
						Standard deviation:
						<input 
							name="deviation"
							type="number"
							step="any" // float
							min="1e-100" // > 0
							value={this.state.deviation} 
							onChange={this.handleChange} 
							required/>
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
							step="any" // float
							value={this.state.hMean} 
							onChange={this.handleChange}
							disabled={!this.state.hypothesis} // only enabled if checkbox is selected
							required/>
					</label>
					<br />
					<input type="submit" value="Ok" />
					<input type="button" value="Reset" onClick={this.handleReset}/>
				</form>

				<br />

				{this.state.formValid ? this.renderTable() : ''}
			</div> 

		)

	}

	// only render the table if the form is valid

}

ReactDOM.render(<MyForm />, document.getElementById('root')); // Add the form to the root page