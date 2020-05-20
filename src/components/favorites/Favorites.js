import React from "react";
import './Favorites.css';



export default class Favorites extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            favorites: []
        };
    }

    render() {
        let favorites = window.localStorage.getItem('favorites');

        return (
            <div>
                {
                    Object.keys(favorites).map(key => (
                            <span> key={key} details={favorites[key]} </span>))
                }
            </div>

        );
    }
}

