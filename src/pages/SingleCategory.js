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
const SeeMore = styled.TouchableOpacity`
    width: 100%;
    padding: 5px 10px;
    flex: 1;
    margin: 20px 0;
    border: 1px solid #857FCF;
    background-color: #857FCF;
    align-items: center;
    justify-content: center;
`;

const TextSeeMore = styled.Text`
    color: #FFF;
    font-weight: 700;
    font-size: 20px;
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

class SingleCategory extends React.Component {

    constructor(props){
        super(props)
        this.state = {loading: true, events: [], offset: 0}
        this.seeMore = this.seeMore.bind(this)
    }

    componentDidMount() {
            fetch(
               `https://api.paris.fr/api/data/2.2/QueFaire/get_events/?token=f7f4c0c6692d9d81e1ea763b4ebe0bafb0598b5f3643feb442ad933f71d2b800&categories=${this.props.navigation.state.params.categoryID}&tags=&start=&end=&offset=&limit=`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            ).then((result) =>{
                return result.json()
            }).then((res) => {
                this.setState({loading: false, events: res.data})
            })
    }

    async seeMore() {
        let offset = this.state.offset + 10
        let result = await fetch(

            `https://api.paris.fr/api/data/2.2/QueFaire/get_events/?token=f7f4c0c6692d9d81e1ea763b4ebe0bafb0598b5f3643feb442ad933f71d2b800&categories=${this.props.navigation.state.params.categoryID}&tags=&start=&end=&offset=${offset}&limit=10`,
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
                    <GoBack onPress={() => {this.props.navigation.goBack(null)}}>
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
                            <Title>Les prochains événements</Title>
                            <Title><Strong>{ this.props.navigation.state.params.categoryTitle }</Strong></Title>
                            {this.state.events.map((item, index) => {
                                return (
                                    <Card key={item.id} event={item} navigation={this.props.navigation} />
                                )
                            })}
                            <SeeMore onPress={this.seeMore}>
                                <TextSeeMore>Voir Plus</TextSeeMore>
                            </SeeMore>
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
    SingleCategory: {
        screen: SingleCategory,
    },
    SingleEvent: {
        screen: SingleEventPage
    }
},
    {
        headerMode: 'none',
    });