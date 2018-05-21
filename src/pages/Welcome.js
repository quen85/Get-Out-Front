import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components';
import { NavigationActions } from 'react-navigation';

const Container = styled.View`
    width: 80%;
    flex 1;
    align-items: center;
    justify-content: center;
`
const WelcomeText = styled.Text`
    color: #FFF;
    margin: 30px 0;
    font-size: 32px;
    text-align: center;
`
const GoToHome = styled.TouchableOpacity`
    background-color: #FFF;
    height: 50px;
    width: 80%;
    align-items: center;
    justify-content: center;
`
const GoToHomeText = styled.Text`
    color: #857FCF;
`
export default class Welcome extends React.Component {

    gotToHome = () => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'TabNavigator' }, { idUser: this.props.navigation.state.idUser })],
        });

        this.props.navigation.dispatch(resetAction);
    }

    render() {
        return (
                <View style={styles.container}>
                    <Container>
                        <Ionicons name="md-checkmark-circle" size={100} color="white" />
                        <WelcomeText>Votre inscription est validée !</WelcomeText>
                        <GoToHome onPress={this.gotToHome}>
                            <GoToHomeText>
                                Commencer à naviguer
                            </GoToHomeText>
                        </GoToHome>
                    </Container>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#857FCF',
        alignItems: 'center',
        justifyContent: 'center',
    }
});