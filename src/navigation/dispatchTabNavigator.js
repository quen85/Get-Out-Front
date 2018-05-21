import React from 'react';
import { addNavigationHelpers } from "react-navigation";
import { connect } from "react-redux";
import {
    createReduxBoundAddListener,
    createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';
import Tab from './TabNavigator'

function TabNavigation({ dispatch, navigation }) {
    const middleware = createReactNavigationReduxMiddleware(
        "root",
        state => state.nav,
    );
    const addListener = createReduxBoundAddListener("root");

    return (
        <Tab
            navigation={addNavigationHelpers({ dispatch, state: navigation, addListener })}
        />
    );
}

function mapStateToProps(state) {
    return {
        navigation: state.navigation
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TabNavigation);