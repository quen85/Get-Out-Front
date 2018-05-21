import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import styled from 'styled-components';
import CardCategory from "../modules/CardCategory";
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
const Header = styled.View`
    background-color: #857FCF;
    width: 100%;
    height: 90px;
    flex-direction: row;
    padding: 10px 0;
`

const Container = styled.View`
    flex: 1;
        background-color: #fff;
        flex-wrap: wrap;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin: 20px 0 0;
`

const Title = styled.Text`
    text-align: center;
    font-size: 24px;
    font-family: Roboto;
    width: 100%;
    margin: 20px 0;
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

class Categories extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isLoading: true, categories: []}
        console.log("here")
    }

    async componentDidMount(){

        let categories = await fetch(
            `https://api.paris.fr/api/data/2.1/QueFaire/get_categories/?token=f7f4c0c6692d9d81e1ea763b4ebe0bafb0598b5f3643feb442ad933f71d2b800`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )

        categories = await categories.json()
        categories = categories.data

        let parentCategories = []

        for (let i = 0;i < categories.length;i++){
            if(categories[i].idParent !== 0){
                parentCategories.push({id: categories[i].id, title: categories[i].title})
            }
        }


        this.state.categories = parentCategories
        this.setState({isLoading: false})
    }

    render() {
        return (
            <Main>
                <Header>
                    <Logo source={require('../assets/img/logo.png')} />
                </Header>
                {this.state.isLoading &&
                <Loading><Text>Loading...</Text></Loading>}
                {!this.state.isLoading &&
                <ScrollView
                    style={styles.container}
                    showsVerticalScrollIndicator={ false }
                >
                    <Container>
                        <Title>Rechercher par <Strong>Catégorie</Strong></Title>
                        {this.state.categories.map((item, index) => {
                            return (
                                <CardCategory key={item.id} title={item.title} id={item.id} navigation={this.props.navigation} />
                            )
                        })}
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

/*StackNavigator({
        Categories: {
            screen: Categories,
        },
        SingleCategory: {
            screen: SingleCategory
        }
    },
    {
        headerMode: 'none',
    });*/

mapStateToProps = (state) => {
    return {
        events: state.events.list,
        loading: state.events.loading,
        user: state.user.user
    }
}

export default connect(mapStateToProps)(Categories)
