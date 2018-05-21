import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, Image, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigator } from 'react-navigation';
import styled from 'styled-components';
import SingleEventPage from './SingleEvent';
import Card from '../modules/Card';
import { loadUserEvents } from '../redux/actions/events'
import { loadUser } from '../redux/actions/user'
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
    flex: 1;
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
`

class Home extends React.Component {

    constructor(props){
        super(props)
        this.seeMore = this.seeMore.bind(this)
        this.state = {loading: true, events: [], offset: 0}
    }

    async componentDidMount() {
        let result = await fetch(
            'https://api.paris.fr/api/data/2.2/QueFaire/get_events/?token=f7f4c0c6692d9d81e1ea763b4ebe0bafb0598b5f3643feb442ad933f71d2b800&categories=&tags=&start=&end=&offset=&limit=',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )
        result = await result.json()

        let id = await AsyncStorage.getItem('id')
        await this.props.loadUser(id)
        await this.props.loadUserEvents(this.props.user)
        this.setState({events: result.data, loading: false})
    }


    async seeMore() {
       let offset = this.state.offset + 10
        console.log(`https://api.paris.fr/api/data/2.2/QueFaire/get_events/?token=f7f4c0c6692d9d81e1ea763b4ebe0bafb0598b5f3643feb442ad933f71d2b800&categories=&tags=&start=&end=&offset=${offset}&limit=10`)
        let result = await fetch(

            `https://api.paris.fr/api/data/2.2/QueFaire/get_events/?token=f7f4c0c6692d9d81e1ea763b4ebe0bafb0598b5f3643feb442ad933f71d2b800&categories=&tags=&start=&end=&offset=${offset}&limit=10`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )
        result = await result.json()


        let events = this.state.events.concat(result.data)
        this.setState({events: events, offset: offset})
    }


    render() {
        return (
            <Main>
                <Header>
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
                            {this.props.user.picture &&
                            <Image source={{ uri: this.props.user.picture }} style={{ width: 200, height: 200, borderRadius: 100 }} />}
                            <Title>Bonjour <Strong>{ this.props.user.firstname }</Strong> !</Title>
                            <Text>Vous { this.props.events.length ?  "" : "n'"}avez <Strong>{ this.props.events.length ?  this.props.events.length : "aucune"}</Strong> sortie{ this.props.events.length > 1 ?  "s" : ""} de prévue</Text>
                            <Title2><Strong>Les prochains événements :</Strong></Title2>
                            {this.state.events.map((item, index) => {
                                return (
                                    <Card key={index} event={item} navigation={this.props.navigation} />
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

mapStateToProps = (state) => {
    return {
        events: state.events.list,
        loading: state.events.loading,
        user: state.user.user
    }
}

mapDispatchToProps = (dispatch) => {
    return {
        loadUserEvents: (user) => loadUserEvents(dispatch, user),
        loadUser: (id) => loadUser(dispatch, id)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)