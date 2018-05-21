import React from 'react';
import { Font } from 'expo';
import {Provider} from 'react-redux'
import store from './src/redux/store';
import { isSignedIn } from "./src/modules/Auth";
import {IsNotLogged, IsLogged} from './src/navigation/AppNavigator'

class App extends React.Component {


    constructor(props){
        super(props)
        this.state = {
            signedIn: false,
            checkedSignIn: false
        };
    }

    componentDidMount() {
        Font.loadAsync({
            'Roboto': require('./src/assets/fonts/Roboto-Medium.ttf'),
        });
        isSignedIn()
            .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
            .catch(err => alert("An error occurred"));
    }

    render = () => {
        const { checkedSignIn, signedIn } = this.state;

        // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
        if (!checkedSignIn) {
            return null;
        }

        if (signedIn) {
            return (
                <Provider store={store}>
                    <IsLogged />
                </Provider>
            );
        } else {
            return (
                <Provider store={store}>
                    <IsNotLogged />
                </Provider>
            );
        }
    }
}

export default App;