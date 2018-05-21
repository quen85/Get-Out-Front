import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, ScrollView, Dimensions} from 'react-native';
import HTML from 'react-native-render-html';
import { IGNORED_TAGS } from 'react-native-render-html/src/HTMLUtils';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import styled from 'styled-components';
import { MapView } from 'expo';
import { loadSingleEvent, unsubscribeToEvent, subscribeEvent } from '../redux/actions/events'
import { unsubscribeUser, subscribeUser } from '../redux/actions/user'
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
    padding: 10px 20px;
`

const Title = styled.Text`
    text-align: center;
    font-size: 24px;
    font-family: Roboto;
    width: 100%;
    font-weight: 700;
    color: #857FCF;
    margin: 0 0 20px;
`
const Inner = styled.View`
    width: 100%;
    flex: 1;
    align-items: center;
    max-width: 100%;
`

const Picture = styled.Image`
    width: 100%;
    height: 400px;
`
const SubscribeButton = styled.TouchableOpacity`
    width: 100%;
    padding: 5px 10px;
    flex: 1;
    margin: 20px 0;
    border: 1px solid #857FCF;
    background-color: #857FCF;
    align-items: center;
    justify-content: center;
`;

const TextSubscribe = styled.Text`
    color: #FFF;
    font-weight: 700;
    font-size: 20px;
`

const UnsubscribeButton = styled.TouchableOpacity`
    width: 100%;
    padding: 5px 10px;
    flex: 1;
    margin: 20px 0;
    border: 1px solid #857FCF;
    background-color: #FFF;
    align-items: center;
    justify-content: center;
`;

const TextUnsubscribe = styled.Text`
    color: #857FCF;
    font-weight: 700;
    font-size: 20px;
`

const SingleInfos = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: flex-start;
    align-self: flex-start;
    margin: 20px 0;
`
const Content = styled.View`
    padding: 0 0 0 20px;
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
const Organisateur = styled.View`
    flex: 1;
    margin: 20px 0;
    flex-direction: column;
    justify-content: flex-start;
    align-self: flex-start;
`
const OrganisateurTitle = styled.Text`
    color: #857FCF;
    font-weight: 700;
    font-size: 18px;
    margin: 0 0 5px;
`
const Contact = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
`
const ContactTitle = styled.Text`
    color: #857FCF;
    font-weight: 700;
    font-size: 18px;
    margin: 0 25px 0 0;
`
const ContactItem = styled.TouchableOpacity`
    margin: 0 15px 0 0;
`

class SingleEventPage extends React.Component {

    constructor(props){
        super(props)
        this.subscribe = this.subscribe.bind(this)
        this.unsubscribe = this.unsubscribe.bind(this)
        this.open = this.open.bind(this)
        this.state = {loading: true}
    }

    async componentDidMount() {
        await this.props.loadSingleEvent(this.props.navigation.state.params.eventID, this.props.navigation.state.params.img, this.props.user)
        this.setState({loading: false})
    }

    getLitteralDate(string) {
        let date = new Date(string);
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('fr-FR', options);
    }

    async subscribe(){
        await this.props.subscribeToEvent(this.props.event, this.props.user, this.props.events)
        this.props.subscribeUser(this.props.event, this.props.user)
    }

    async unsubscribe() {
        await this.props.unsubscribeToEvent(this.props.user, this.props.event, this.props.events)
        this.props.unsubscribeUser(this.props.user, this.props.event)
    }

    async open(url) {
        console.log(await Linking.canOpenURL(url))
        Linking.openURL(url)
    }


    render() {
        return (
            <Main>
                <Header>
                    <GoBack onPress={() => {this.props.navigation.goBack()}}>
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
                    <Picture source={{ uri: this.props.event.image }} />
                    <Container>
                        <Inner>
                            <Title>{ this.props.event.nom }</Title>
                            <Text>{ this.props.event.small_description }</Text>
                            <SingleInfos>
                                <Ionicons name="md-pin" size={30} color="#857FCF" />
                                <Content>
                                    <Text>{ this.props.event.lieux }</Text>
                                    <Text>{ this.props.event.adresse }, { this.props.event.zipcode } {this.props.event.city}</Text>
                                </Content>
                            </SingleInfos>
                            <SingleInfos>
                                <Ionicons name="md-time" size={30} color="#857FCF" />
                                <Content>
                                    {this.props.event.periodes[0].dateEnd === this.props.event.periodes[0].dateStart ? (
                                        <Text>{ this.getLitteralDate(this.props.event.periodes[0].dateStart) }</Text>)
                                        : (
                                            <Text>{ this.getLitteralDate(this.props.event.periodes[0].dateStart) }</Text>
                                        )
                                    }
                                    <Text>{ this.props.event.periodes[0].seances[0].hourStart.slice(0, 5) }</Text>
                                </Content>
                            </SingleInfos>
                            <HTML html={ this.props.event.description.text } style={ styles.html } ignoredTags={[ ...IGNORED_TAGS, 'iframe']} ignoredStyles={["font-family", "background-color", "color"]} />
                            {this.props.event.contactNom &&
                            <Organisateur>
                                <OrganisateurTitle>Nom de l'organisateur :</OrganisateurTitle>
                                <Text>{this.props.event.contactNom}</Text>
                            </Organisateur>}
                            <Contact>
                                <ContactTitle>Contacter :</ContactTitle>
                                {this.props.event.contactFacebook &&
                                <ContactItem onPress={() => this.open(this.props.event.contactFacebook)}>
                                    <Ionicons name="logo-facebook" size={30} color="#857FCF" />
                                </ContactItem>}
                                {this.props.event.contactMail &&
                                <ContactItem onPress={() => this.open('mailto:' + this.props.event.contactMail)}>
                                    <Ionicons name="md-mail" size={30} color="#857FCF" />
                                </ContactItem>}
                                {this.props.event.contactPhone &&
                                <ContactItem onPress={() => this.open('tel:' + this.props.event.contactPhone)}>
                                    <FontAwesome name="phone" size={30} color="#857FCF" />
                                </ContactItem>}
                                {this.props.event.contactTwitter &&
                                <ContactItem onPress={() => this.open(this.props.event.contactTwitter)}>
                                    <Ionicons name="logo-twitter" size={30} color="#857FCF" />
                                </ContactItem>}
                                {this.props.event.contactUrl &&
                                <ContactItem onPress={() => this.open(this.props.event.contactUrl)}>
                                    <FontAwesome name="external-link" size={30} color="#857FCF" />
                                </ContactItem>}
                            </Contact>
                            {!this.props.event.userParticipate &&
                            <SubscribeButton onPress={ () => this.subscribe() }>
                                <TextSubscribe>J'y vais !</TextSubscribe>
                            </SubscribeButton>
                            }
                            {this.props.event.userParticipate &&
                            <UnsubscribeButton onPress={ () => this.unsubscribe() }>
                                <TextUnsubscribe>Je n'y vais plus</TextUnsubscribe>
                            </UnsubscribeButton>
                            }
                            <MapView
                                style={ styles.map }
                                initialRegion={{
                                    latitude: this.props.event.lat,
                                    longitude: this.props.event.lon,
                                    latitudeDelta: 0.00922,
                                    longitudeDelta: 0.00421,
                                }}
                            >
                                <MapView.Marker
                                    coordinate={{latitude: this.props.event.lat, longitude: this.props.event.lon}}
                                    title={"Some Title"}
                                    description={"Hello world"}
                                />
                            </MapView>
                        </Inner>
                    </Container>
                </ScrollView>}
            </Main>
        );
    }
}


let { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
    },
    map: {
        flex: 1,
        width: width,
        height: 300,
        marginTop: 20,
    },
    html: {
        maxWidth: "100%",
    }
});

mapStateToProps = (state) => {
    return {
        user: state.user.user,
        loadingSingle: state.events.loadingSingle,
        events: state.events.list,
        event: state.events.event
    }
}

mapDispatchToProps = (dispatch) => {
    return {
        loadSingleEvent: (id, img, user) => loadSingleEvent(dispatch, id, img, user),
        unsubscribeUser: (user, event) => unsubscribeUser(dispatch, user, event),
        unsubscribeToEvent: (user, event, events) => unsubscribeToEvent(dispatch, user, event, events),
        subscribeToEvent: (event, user, events) => subscribeEvent(dispatch, event, user, events),
        subscribeUser: (event, user) => subscribeUser(dispatch, event, user),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleEventPage)