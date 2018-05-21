import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigator } from 'react-navigation';
import styled from 'styled-components';
import SingleEventPage from './SingleEvent';
import Card from '../modules/Card';

const Main = styled.View`
    background-color: #FFF;
    flex: 1;
`
const Loading = styled.View`
    background-color: #FFF;
    flex: 1;
    align-items: center;
    justify-content: center;
`
const Container = styled.View`
    padding: 20px;
`
const Header = styled.View`
    background-color: #857FCF;
    width: 100%;
    height: 90px;
    flex-direction: row;
    padding: 10px 20px;
`

const Title = styled.Text`
    text-align: center;
    font-size: 24px;
    font-family: Roboto;
    width: 100%;
    margin: 0 0 20px;
`
const Strong = styled.Text`
    font-weight: 700;
    color: #857FCF;
`
const Inner = styled.View`
    width: 100%;
    flex: 1;
    align-items: center;
`
const Logo = styled.Image`
    flex: 1;
    width: null;
    height: null;
    resizeMode: contain;
    flex-grow: 10;
    margin: 0 30px 0 0;
`
const GoBack = styled.TouchableOpacity`
    flex: 1;
    flex-grow: 1;
    margin: 10px 0 0;
`

class SearchByLocation extends React.Component {

    constructor(props){
        super(props)
        this.user = null
        this.state = {loading: true, events: []}
    }

    async componentDidMount() {
        let result = await fetch(
            `https://api.paris.fr/api/data/2.2/QueFaire/get_events/?token=f7f4c0c6692d9d81e1ea763b4ebe0bafb0598b5f3643feb442ad933f71d2b800&categories=&tags=&start=&end=&offset=50&limit=`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        );
        let res = await result.json();

        this.setState({loading: false, events: res.data})
    }

    render() {

        return (
            <Main>
                <Header>
                    <GoBack onPress={() => this.props.navigation.goBack(null)}>
                        <Ionicons name="ios-arrow-round-back-outline" size={60} color="#FFFFFF" />
                    </GoBack>
                    <Logo source={require('../assets/img/logo.png')} />
                </Header>
                {this.state.loading &&
                <Loading><Text>Loading...</Text></Loading>}
                {!this.state.loading &&
                <ScrollView
                    contentContainerStyle={styles.container}
                    showsVerticalScrollIndicator={ false }
                >
                    <Container>
                        <Inner>
                            <Title>Les événements proches de vous</Title>
                            {this.state.events.map((item, index) => {
                                return (
                                    <Card key={item.id} event={item} navigation={this.props.navigation} />
                                )
                            })}
                        </Inner>
                    </Container>
                </ScrollView>}
            </Main>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
    },
});

export default StackNavigator({
        SearchByLocation: {
        screen: SearchByLocation,
    },
    SingleEvent: {
        screen: SingleEventPage
    }
},
    {
        headerMode: 'none',
    });