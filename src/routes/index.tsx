import React from 'react';
import { Switch } from 'react-router-dom';
import Profile from '../pages/Profile';
import Route from './Route';

const Routes = () => {
    return (
        <Switch>
            <Route component={Profile} />
        </Switch>
    );
};

export default Routes;
