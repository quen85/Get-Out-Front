import React, { PropTypes } from "react";
import { addNavigationHelpers } from "react-navigation";
import {
    createReduxBoundAddListener,
    createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';
import { connect } from "react-redux";

import AppNavigator from "./AppNavigator";

function Navigation({ dispatch, navigation }) {
    const middleware = createReactNavigationReduxMiddleware(
        "root",
        state => state.nav,
    );
    const addListener = createReduxBoundAddListener("root");

    return (
        <AppNavigator
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

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);