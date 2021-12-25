import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import storage from '../utils/storage';

const PublicRoute = ({ component: Component, ...rest }) => {
    return(
        <Route
            { ...rest }
            render={ (props) => {
                const isAuthenticated = !!storage.getToken();
                return isAuthenticated ? <Redirect to={ { pathname: '/' } }/> : <Component { ...props } />;
            } }/>
        );
}

export default PublicRoute;