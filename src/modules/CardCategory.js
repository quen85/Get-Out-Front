import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import SingleCategory from '../pages/SingleCategory';

const SingleCategoryView = styled.View`
    width: 50%;
    height: 150px;
    padding: 0 15px;
    margin: 0 0 20px;
`

const Inner = styled.TouchableOpacity`
    background-color: #857FCF;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 0 15px;
`

const InnerText = styled.Text`
    color: #FFF;
    font-weight: 700;
    font-size: 18px;
    text-align: center;
`

export default class CardCategory extends React.Component {

    constructor(props){
        super(props)
        this.categoryClick = this.categoryClick.bind(this)
    }

    categoryClick = (id, title) => {
        console.log(this.props.navigation.state.key)
        this.props.navigation.navigate('SingleCategory', {
            categoryID: id,
            categoryTitle: title
        })
    }

    render() {
        return(
            <SingleCategoryView>
                <Inner onPress={ () => this.categoryClick(this.props.id, this.props.title) }>
                    <InnerText>{ this.props.title }</InnerText>
                </Inner>
            </SingleCategoryView>
        )
    }

}