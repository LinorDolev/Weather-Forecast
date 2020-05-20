import React from 'react';
import Favorites from "../components/favorites/Favorites";
import Home from "../components/home/Home";
import { Route, Switch } from 'react-router-dom';

function Routes() {
   return(
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/home" component={Home}/>
        <Route path="/favorites" component={Favorites}/>
    </Switch>
   );
}

export default Routes;
