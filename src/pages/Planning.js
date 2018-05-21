import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigator } from 'react-navigation';
import styled from 'styled-components';
import SingleEventPage from './SingleEvent';
import Card from '../modules/Card'
import { loadUserEvents } from '../redux/actions/events'
import { connect } from 'react-redux'

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
    padding: 50px 20px;
`
const Header = styled.View`
    background-color: #857FCF;
    width: 100%;
    height: 90px;
    flex-direction: row;
    padding: 10px 0;
`

const Title = styled.Text`
    text-align: center;
    font-size: 24px;
    font-family: Roboto;
    width: 100%;
    margin: 15px 0 0;
`
const Title2 = styled.Text`
    text-align: center;
    font-size: 20px;
    font-family: Roboto;
    width: 100%;
    margin: 15px 0;
`
const Strong = styled.Text`
    font-weight: 700;
    color: #857FCF;
`
const Logo = styled.Image`
    flex: 1;
    width: null;
    height: null;
    resizeMode: contain;
`

class Planning extends React.Component {

    constructor(props){
        super(props)
        this.state = {loading: true, events: [], user: null}
        this.updateEvents.bind(this)
    }

    updateEvents = async () => {
        let id = await AsyncStorage.getItem('id')

        this.state.user = await fetch(
            `https://back-get-out.herokuapp.com/users/${id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )

        this.state.user = await this.state.user.json()

        let allEvents = []

        let events = this.state.user.events.map(async (item, index) => {
            let event = await fetch(
                `https://back-get-out.herokuapp.com/events/${item}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            )
            event = await event.json()

            allEvents.push(event)
        })


        Promise.all(events).then(() => {
            this.setState({events: allEvents})
        });
    }

    render() {

        return (
            <Main>
                <Header>
                    <Logo source={require('../assets/img/logo.png')} />
                </Header>
                {this.props.loading &&
                <Loading><Text>Loading...</Text></Loading>}
                {!this.props.loading &&
                <ScrollView
                    contentContainerStyle={styles.container}
                    showsVerticalScrollIndicator={ false }
                >
                    <Container>
                            <View>
                                <Title>Mes prochains <Strong>événements</Strong></Title>
                                <Title2><Strong>{this.props.events.length}</Strong> de prévu :</Title2>
                                {this.props.events.map((item, index) => {
                                    return (
                                        <Card key={index} event={item} navigation={this.props.navigation} />
                                    )
                                })}
                            </View>
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

mapStateToProps = (state) => {
    return {
        events: state.events.list,
        loading: state.events.loading
    }
}

export default connect(mapStateToProps)(Planning)