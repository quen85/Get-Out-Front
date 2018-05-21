import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import ConnexionForm from './../forms/connexionForm';
import FacebookLogin from './../forms/facebookLogin';
import styled from 'styled-components';
import { NavigationActions } from "react-navigation";

const SubscribeText = styled.Text`
    color: #FFF;
`;

const Subscribe = styled.TouchableOpacity`
    width: 80%;
    margin: 0 0 20px;
    align-items: center;
    justify-content: center;
    height: 40px;
    max-height: 40px;
    background-color: #857FCF;
`;

const Logo = styled.Image`
    width: 205px;
    height: 177px;
    margin: 0 0 30px;
`


export default class Connexion extends React.Component {

    constructor(props) {
        super(props);
        this.goToSubscription = this.goToSubscription.bind(this);
    }


    goToSubscription () {
        this.props.navigation.navigate('Subscription')
    }

    goToHome = () => {
        const navigateToTab = NavigationActions.navigate({
            routeName: "TabNavigator"
        });
        this.props.navigation.dispatch(navigateToTab);
    }

    render() {
        return (
            <View style={styles.container}>
                <Logo source={require('../assets/img/logo-color.png')} />
                <ConnexionForm navigation={this.props.navigation}/>
                <FacebookLogin goToHome={this.goToHome} navigation={this.props.navigation}/>
                <Subscribe onPress={ this.goToSubscription }>
                    <SubscribeText>
                        Inscrivez-vous
                    </SubscribeText>
                </Subscribe>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});