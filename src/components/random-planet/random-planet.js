import React, { Component, Fragment } from 'react';

import './random-planet.css';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import SwapiService from '../../services/swapi-service';

export default class RandomPlanet extends Component {
	swapiService = new SwapiService();

	state = {
        planet: {},
        isLoading: true,
        hasError: false
	};

    componentDidMount() {
        this.updatePlanet();
        this.interval = setInterval(this.updatePlanet, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    

    onPlanetLoaded = (planet) => {
        this.setState({planet, isLoading: false});
    };

	updatePlanet = () => {
        const id = Math.floor(Math.random()*25) + 3;
        this.swapiService
            .getPlanet(id)
            .then((this.onPlanetLoaded))
            .catch(this.onError);
    }
    
    onError = (err) => {
        this.setState({
            isLoading: false,
            hasError: true
        });
    };

	render() {
        const { planet, isLoading, hasError } = this.state;

        const hasData = !(isLoading || hasError);

        const errorMessage = hasError ? <ErrorIndicator /> : null;
        const spinner = isLoading ? <Spinner /> : null;
        const content = hasData ? <PlanetView planet={planet} /> : null;

		return (
            <div className="random-planet jumbotron rounded">
                {errorMessage}
                {spinner}
                {content}
			</div>
		);
	}
}

const PlanetView = ({ planet }) => {
    const { id, name, population, rotationPeriod, diameter } = planet;
    const src = `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`;

    return (
        <Fragment>
            <img
                className="planet-image"
                src={src}
                alt="A random planet"
            />
            <div>
                <h2>{name}</h2>
                <p>
                    Population <span>{population}</span>
                </p>
                <p>
                    Rotation Period <span>{rotationPeriod}</span>
                </p>
                <p>
                    Diameter <span>{diameter}</span>
                </p>
            </div>
        </Fragment>
    );
}