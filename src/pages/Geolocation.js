import React from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigator } from 'react-navigation';
import styled from 'styled-components';
import { MapView, Marker, Permissions, Location } from 'expo';
import SearchByLocation from './SearchByLocation';

const Loading = styled.View`
    background-color: #FFF;
    flex: 1;
    align-items: center;
    justify-content: center;
    width: 100%;
`
const Header = styled.View`
    background-color: #857FCF;
    width: 100%;
    height: 90px;
    flex-direction: row;
    padding: 10px 0;
`

const Container = styled.View`
    width: 100%;
    flex: 1;
    align-items: center;
    max-width: 100%;
    flex-direction: column;
`

const Button = styled.TouchableOpacity`
    width: 100%;
    flex: 1;
    align-items: center;
    justify-content: center;
    height: 40px;
    background-color: #857FCF;
`

const TextButton = styled.Text`
    color: #FFF;
    font-family: Roboto;
    font-size: 16px;
    font-weight: 700;
`

const Logo = styled.Image`
    flex: 1;
    width: null;
    height: null;
    resizeMode: contain;
`

let { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    map: {
        flex: 1,
        flexGrow: 8,
        width: Math.round(width),
        height: Math.round(height),
    },
});

export default class Geolocation extends React.Component {

    constructor(props){
        super(props)
        this.state = {isLoading: true}
        this.changeLocation = this.changeLocation.bind(this)
        this.buttonClick = this.buttonClick.bind(this)
    }

    async componentDidMount(){
        let { status } = await Permissions.askAsync(Permissions.LOCATION);

        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }


        let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});

        this.setState({ location: {lat: location.coords.latitude, lng: location.coords.longitude}, isLoading: false });

    }

    changeLocation = (e) => {
        this.setState({location: {lat: e.nativeEvent.coordinate.latitude, lng: e.nativeEvent.coordinate.longitude}})
    }

    buttonClick = () => {
        console.log(this.props.navigation)
        this.props.navigation.navigate('SearchByLocation')
    }


    render() {

        return (
                <Container>

                    <Header>
                        <Logo source={require('../assets/img/logo.png')} />
                    </Header>

                    {this.state.isLoading &&
                    <Loading><Text>Loading...</Text></Loading>}
                    {!this.state.isLoading &&
                        <Container>
                            <MapView
                                style={ styles.map }
                                initialRegion={{
                                    latitude: this.state.location.lat,
                                    longitude: this.state.location.lng,
                                    latitudeDelta: 0.00922,
                                    longitudeDelta: 0.00421,
                                }}
                            >
                                <MapView.Marker draggable
                                            coordinate={{latitude: this.state.location.lat, longitude: this.state.location.lng}}
                                            onDragEnd={(e) => this.changeLocation(e)}
                                            onDragStart={(e) => console.log(e)}
                                />
                            </MapView>
                            <Button title="Chercher à cet endroit" onPress={() => this.buttonClick()}>
                                <TextButton>Chercher à cet endroit</TextButton>
                            </Button>
                        </Container>}

                </Container>
        );
    }
}