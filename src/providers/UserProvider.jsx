import React, { createContext } from 'react';
import { auth } from '../firebase';

export const UserContext = createContext({ user: null });

class UserProvider extends React.Component {
    state = {
        user: null
    }

    componentDidMount = () => {
        auth.onAuthStateChanged(userAuth => {
            this.setState({ userAuth })
        });
    }

    render() {
        return (<UserContext.Provider value={this.state.user}>{this.props.children}</UserContext.Provider>)
    }
}

export default UserProvider;