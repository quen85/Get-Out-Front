import React from "react";
import {AsyncStorage} from "react-native"
import {
    StackNavigator
} from "react-navigation";

import Connexion from '../pages/Connexion';
import Subscription from '../pages/Subscription';
import Welcome from '../pages/Welcome';
import SingleEvent from '../pages/SingleEvent';
import SingleCategory from '../pages/SingleCategory';
import SearchByLocation from '../pages/SearchByLocation';
import Tab from '../navigation/TabNavigator';

export const IsNotLogged = StackNavigator({
        Connexion: { screen: Connexion },
        Subscription: { screen: Subscription },
        Welcome: { screen: Welcome },
        TabNavigator: { screen: Tab },
        SingleEvent: { screen: SingleEvent },
        SingleCategory: { screen: SingleCategory },
        SearchByLocation: { screen: SearchByLocation },
    }, {
        headerMode: 'none',
        initialRouteName: "Connexion"
    }
)

export const IsLogged = StackNavigator({
        Connexion: { screen: Connexion },
        Subscription: { screen: Subscription },
        Welcome: { screen: Welcome },
        TabNavigator: { screen: Tab },
        SingleEvent: { screen: SingleEvent },
        SingleCategory: { screen: SingleCategory },
        SearchByLocation: { screen: SearchByLocation },
    }, {
        headerMode: 'none',
        initialRouteName: "TabNavigator"
    }
)