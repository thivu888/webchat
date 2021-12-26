import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import storage from '../utils/storage';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        { ...rest }
        render={ (props) => {
            const isAuthenticated = !!storage.getToken();
            const user = storage.getUserInfo()
            if (!isAuthenticated) {
                return <Redirect to={ { pathname: '/login' } }/>;
            }
            if(user.verify) {
                return <Redirect to={ { pathname: '/' } }/>;
            }

            return <Component { ...props } />;
        } }/>
);

export default PrivateRoute;
