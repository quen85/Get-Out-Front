import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

const SingleEvent = styled.TouchableOpacity`
    width: 100%;
    margin-bottom: 30px;
`

const Picture = styled.Image`
    flex: 1;
    width: undefined;
    height: 300;
`

const TitleEvent = styled.View`
    background-color: #857FCF;
    flex: 1;
    align-items: center;
    justify-content: center;
    height: 60px;
    padding: 0 15px;
`

const TitleEventText = styled.Text`
    color: #FFFFFF;
    text-align: center;
`

export default class Card extends React.Component {

    constructor(props){
        super(props)
        this.eventClick = this.eventClick.bind(this)
    }

    eventClick = (id, img) => {

        this.props.navigation.navigate('SingleEvent', {
            eventID: id,
            isExternal: true,
            img: img
        })
    }

    render() {
        return(
            <SingleEvent onPress={ () => this.eventClick(this.props.event.id ? this.props.event.id : this.props.event.idApi, this.props.event.image.url ? this.props.event.image.url : this.props.event.image) } >
                <Picture resizeMode="cover" source={{ uri: this.props.event.image.url ? this.props.event.image.url : this.props.event.image }} />
                <TitleEvent>
                    <TitleEventText>{this.props.event.title}</TitleEventText>
                </TitleEvent>
            </SingleEvent>
        )
    }

}