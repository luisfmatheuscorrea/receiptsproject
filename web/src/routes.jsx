import React, { useContext } from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';

import Receipt from './pages/Receipt';
import CreateReceipt from './pages/CreateReceipt';
import Login from './pages/Login';

import StoreProvider from './components/Store/Provider';
import StoreContext from './components/Store/Context';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { token } = useContext(StoreContext);

    console.log(token)

    return (
        <Route
            {...rest}
            render={() => token
                ? <Component {...rest} />
                : <Redirect to="/login" />
            }
        />
    )
}

function Routes() {
    return (
        <BrowserRouter>
            <StoreProvider>
                <Route path="/login" component={Login} />
                <PrivateRoute path="/" exact component={Receipt} />
                <PrivateRoute path="/create-receipt" exact component={CreateReceipt} />
            </StoreProvider>
        </BrowserRouter>
    )
}

export default Routes;