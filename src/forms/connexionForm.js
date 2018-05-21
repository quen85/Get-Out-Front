import React from 'react';
import { StyleSheet, TextInput, View, Alert, AsyncStorage } from 'react-native';
import styled from 'styled-components';
import { NavigationActions } from 'react-navigation';

const Form = styled.View`
    width: 80%;
    margin: 0 0 20px;
    align-items: center;
    justify-content: center;
`;

const Input = styled.TextInput`
    width: 100%;
    border: 2px solid #857FCF;
    padding: 5px 10px;
    margin: 0 0 20px;
    height: 40px;
    max-height: 40px;
`;

const Submit = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40px;
    max-height: 40px;
    background-color: #857FCF;
`;
const SubmitText = styled.Text`
    color: #FFF;
`

export default class ConnexionForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { email: '', password: '' };
    }


    connexion = () => {
        let param = {email: this.state.email, pwd: this.state.password}
        fetch(
            `https://back-get-out.herokuapp.com/authentification/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(param)
            }
        ).then((res) => {
            return res.json()
        }).then((response) => {
            AsyncStorage.setItem('id', response._id)
        }).then((id) => {
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Home' })],
            });
            this.props.navigation.dispatch(resetAction);
        })
    }

    handleEmail = (email) => {
        this.setState({ email: email })
    }

    handlePassword = (pwd) => {
        this.setState({ password: pwd })
    }

    render() {
        return (
            <Form>
                <Input
                    placeholder="Votre email"
                    value={this.state.email}
                    underlineColorAndroid="transparent"
                    onChangeText={this.handleEmail}
                    keyboardType="email-address"
                />
                <Input
                    placeholder="Votre mot de passe"
                    value={this.state.password}
                    underlineColorAndroid="transparent"
                    onChangeText={this.handlePassword}
                    secureTextEntry={true}
                />
                <Submit
                    color="#857FCF"
                    onPress={this.connexion}
                    title="Connexion"
                >
                    <SubmitText>Connexion</SubmitText>
                </Submit>
            </Form>
        );
    }
}