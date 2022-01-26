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
			[name]: value,
			formValid: false
		});

	}

	handleSubmit(event){
		event.preventDefault();
		this.setState({"formValid": true});
	}

	handleReset(event){
		
		Object.keys(this.state).forEach((key) => {
			this.setState({
				[key]: ''
			})
		});

		this.refs.checkbox.checked = false;

	}

	renderTable(){

		let h = this.state.hypothesis;

		return (
			<div id="Table">
				<table>
					<tr>
						<th>Sample Size:</th>
						<th>{this.state.size}</th>
					</tr>
					<tr>
						<th>Sample Mean:</th>
						<th>{this.state.mean}</th>
					</tr>
					<tr>
						<th>Standard deviation:</th>
						<th>{this.state.deviation}</th>
					</tr>
					{h ? this.renderHMean() : ''}
				</table>
			</div>
		)

	}

	renderHMean(){

		return(

			<tr>
				<th>Hypothesized mean:</th>
				<th>{this.state.hMean}</th>
			</tr>

		);

	}

	render(){

		return(

			<div id="form">

				<form onSubmit={this.handleSubmit}>
					<label>
						Sample Size:
						<input 
							name="size"
							type="number"
							min="2"
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
							step="any"
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
							step="any"
							min="1"
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
							step="any"
							value={this.state.hMean} 
							onChange={this.handleChange}
							disabled={!this.state.hypothesis} 
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

}

ReactDOM.render(<MyForm />, document.getElementById('root'));