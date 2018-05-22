import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components';
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
const Strong = styled.Text`
    font-weight: 700;
    color: #857FCF;
`
const Inner = styled.View`
    width: 100%;
    flex: 1;
    align-items: center;
`

const UpdateButton = styled.TouchableOpacity`
    width: 100%;
    padding: 5px 10px;
    flex: 1;
    margin: 20px 0;
    border: 1px solid #857FCF;
    background-color: #857FCF;
    align-items: center;
    justify-content: center;
`;

const TextUpdateButton = styled.Text`
    color: #FFF;
    font-weight: 700;
    font-size: 20px;
`
const Logo = styled.Image`
    flex: 1;
    width: null;
    height: null;
    resizeMode: contain;
`

class Profile extends React.Component {

    constructor(props){
        super(props)
        this.state = {loading: true}
    }

    async componentDidMount() {

        this.setState({loading: false})

    }

    navigateToSubscription(){
        this.props.navigation.navigate('Subscription')
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
                            <Title>Prénom: <Strong>{ this.props.user.firstname }</Strong></Title>
                            <Title>Nom: <Strong>{ this.props.user.lastname }</Strong></Title>
                            <Title>Nombre d'événements de prévu: <Strong>{ this.props.events.length }</Strong></Title>

                            <UpdateButton onPress={() => this.navigateToSubscription()}>
                                <TextUpdateButton>Modifier mon profil</TextUpdateButton>
                            </UpdateButton>
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

export default connect(mapStateToProps)(Profile)