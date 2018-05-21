import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
const GoToHome = styled.Button`
    background-color: #FFF;
    color: #857FCF;
    height: 50px;
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
                        <GoToHome title="Commencer à naviguer" onPress={this.gotToHome} />
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