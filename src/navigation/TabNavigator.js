import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TabNavigator, TabBarBottom, NavigationActions } from 'react-navigation';
import HomeNav from '../pages/Home';
import Planning from '../pages/Planning';
import Categories from '../pages/Categories';
import Geolocation from '../pages/Geolocation';
import Profile from '../pages/Profile';


export default TabNavigator(
    {
        Categories: { screen: Categories },
        Geolocation: { screen: Geolocation },
        Home: { screen: HomeNav },
        Planning: { screen: Planning },
        Profile: { screen: Profile },
    },

    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Categories') {
                    iconName = `heart`;
                }
                else if (routeName === 'Geolocation') {
                    iconName = `map-marker`;
                }
                else if (routeName === 'Home') {
                    iconName = `home`;
                }
                else if (routeName === 'Planning') {
                    iconName = `clock-o`;
                }
                else if (routeName === 'Profile') {
                    iconName = `user`;
                }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Icon name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: '#857FCF',
            inactiveTintColor: '#d3d1ff',
            showLabel: false
        },
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: false,
        removeClippedSubviews: true,
        initialRouteName: 'Home'
    }
);