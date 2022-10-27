import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const ProtectedRoute = ({ component: Component, ...props }) => {
    return (
        <Route>
            {() =>
                props.loggedIn ? (
                    <>
                        <Header loggedIn={true} email={props.email} linkText={undefined} onSignOut={props.onSignOut} />
                        <Component {...props} />
                        <Footer />
                    </>
                ) : (
                    <Redirect to="/sign-in" />
                )
            }
        </Route>
    );
};

export default ProtectedRoute;
