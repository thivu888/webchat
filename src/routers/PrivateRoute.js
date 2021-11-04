import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import storage from '../utils/storage';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        { ...rest }
        render={ (props) => {
            const isAuthenticated = !!storage.getToken();
            if (!isAuthenticated) {
                return <Redirect to={ { pathname: '/login' } }/>;
            }
            return <Component { ...props } />;
        } }/>
);

export default PrivateRoute;
