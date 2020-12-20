import { BrowserRouter, Redirect, Route } from 'react-router-dom';

import Receipt from './pages/Receipt';
import CreateReceipt from './pages/CreateReceipt';

import { useSelector } from 'react-redux';

function PrivateRoute({ component: Component, ...rest }) {
    const { isAuthenticated } = useSelector(state => state.auth)

    console.log(isAuthenticated)

    return (
        <Route 
            {...rest}
            render={(props) => 
                isAuthenticated ? (<Component {...props} />) : (<Redirect to={{ pathname: '/', state: { from: props.location } }}/>) }
        />
    )
}

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Receipt} />
            <Route path="/create-receipt" exact component={CreateReceipt} />
        </BrowserRouter>
    )
}

export default Routes;