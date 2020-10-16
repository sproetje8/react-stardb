import React, {Component} from 'react';

import './person-details.css';

import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';
import ErrorButton from '../error-button';

import SwapiService from '../../services/swapi-service';

export default class PersonDetails extends Component {
    swapiService = new SwapiService();

    state = {
        person: null,
        isLoading: true,
        hasError: false
    };

    componentDidMount() {
        this.updatePerson();
    }

    componentDidUpdate(prevProps) {
        if (this.props.personId !== prevProps.personId) {
            this.updatePerson();
        }
    }

    updatePerson() {
        
        const { personId } = this.props;

        if (!personId) {
            return;
        }

        this.swapiService
            .getPerson(personId)
            .then((person) => {
                this.setState({ person, isLoading: false, hasError: false });
            })
            .catch((err) => {
                this.setState({isLoading: false, hasError: true})
            });
    }

    render() {

        if (!this.state.person) {
            return (<span>Select a person from the list</span>);
        }

        const { person: { id, name, gender, birthYear, eyeColor }, isLoading, hasError } = this.state;
        const src = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;

        if (isLoading) {
            return <Spinner />;
        }

        if (hasError) {
            return <ErrorIndicator />;
        }

        return (
            <div className="person-details card">
                <img className="person-image"
                    src={src}
                    alt="A star wars character"
                    />
                <div className="card-body">
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="term">Gender</span>
                            <span>{gender}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Birth Year</span>
                            <span>{birthYear}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Eye Color</span>
                            <span>{eyeColor}</span>
                        </li>
                        <ErrorButton />
                    </ul>

                </div>
            </div>
        );
    }
}