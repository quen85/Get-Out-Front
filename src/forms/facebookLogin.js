import React from 'react';
import { Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import styled from 'styled-components';

const Login = styled.TouchableOpacity`
    width: 80%;
    margin: 0 0 20px;
    align-items: center;
    justify-content: center;
    height: 40px;
    max-height: 40px;
    background-color: #857FCF;
`

const LoginText = styled.Text`
    color: #FFF;
`

export default class FacebookLogin extends React.Component {

    constructor(props) {
        super(props);
        this.connectFacebook = this.connectFacebook.bind(this)
    }

    async connectFacebook() {

        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('862460643959033', {
            permissions: ['public_profile'],
        });
        if (type === 'success') {
            let response = await fetch(
                `https://graph.facebook.com/me?access_token=${token}&fields=first_name,last_name,email`);
            response = await response.json()
            const res = await fetch(
                `https://back-get-out.herokuapp.com/authentification/facebook?idFacebook=${response.id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            )
            const user = await(res.json());

            if(!Object.keys(user).length){

                let userFacebook = response;
                let userPicture = await fetch(
                    `https://graph.facebook.com/v3.0/me/picture?access_token=${token}&redirect=false&type=large`)

                userPicture = await userPicture.json()

                let param = { idFacebook: userFacebook.id, firstname: userFacebook.first_name, lastname: userFacebook.last_name, picture: userPicture.data.url }

                let newUser = await fetch(
                    `https://back-get-out.herokuapp.com/authentification/facebook`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(param)
                    }
                )

                newUser = await newUser.json()

                await AsyncStorage.setItem('id', newUser._id)

                let id = await AsyncStorage.getItem('id')
            }
            else{

                await AsyncStorage.setItem('id', user._id)

                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'TabNavigator'})],
                });

                this.props.navigation.dispatch(resetAction);
            }
        }
    }

    render() {
        return (
            <Login onPress={() => this.connectFacebook()}>
                <LoginText>
                    Connexion avec Facebook
                </LoginText>
            </Login>
        );
    }
}