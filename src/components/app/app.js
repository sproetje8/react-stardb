import React, { Component } from 'react';

import './app.css';

import Header from '../header';
import RandomPlanet from '../random-planet/random-planet';
import ErrorButton from '../error-button';
import ErrorIndicator from '../error-indicator';
import PeoplePage from '../people-page/people-page';
import ItemList from '../item-list';
import PersonDetails from '../person-details';

import SwapiService from '../../services/swapi-service';

export default class App extends Component {
	swapiService = new SwapiService();

	state = {
		hasError: false
	};

	componentDidCatch() {
		console.log('componentDidCatch');
		this.setState({ hasError: true });
	}

	render() {

		if (this.state.hasError) {
			return <ErrorIndicator />;
		}

		return (
			<div>
				<Header />
				<RandomPlanet />

				<ErrorButton />

				<PeoplePage />
				
				<div className="row mb2">
					<div className="col-md-6">
						<ItemList
							onItemSelected={this.onPersonSelected}
							getData={this.swapiService.getAllPlanets}/>
					</div>
					<div className="col-md-6">
						<PersonDetails personId={this.state.selectedPerson} />
					</div>
				</div>
				
				<div className="row mb2">
					<div className="col-md-6">
						<ItemList
							onItemSelected={this.onPersonSelected}
							getData={this.swapiService.getAllStarships}/>
					</div>
					<div className="col-md-6">
						<PersonDetails personId={this.state.selectedPerson} />
					</div>
           		</div>
			</div>
		);
	}
}
