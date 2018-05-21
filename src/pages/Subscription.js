import React from 'react';
import {
    Image,
    LayoutAnimation,
    NativeModules,
    Animated,
    StyleSheet,
    Text,
    View,
    ScrollView,
    DatePickerAndroid,
    KeyboardAvoidingView,
    AsyncStorage,
    DatePickerIOS,
    Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';
import styled from 'styled-components';
import { ImagePicker } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { createUser, updateUser } from '../redux/actions/user'
import { connect } from 'react-redux'

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

const Input = styled.TextInput`
    width: 100%;
    border: ${props => (props.validate || !props.hasBeenTyped) ? '2px solid #857FCF' : '2px solid red'};
    padding: 5px 10px;
    margin: 0 0 20px;
    height: 50px;
`;

const Container = styled.View`
    width: 80%;
`
const ContainerPicture = styled.View`
    background-color: #857FCF;
    padding: 50px 10%;
    flex: 1;
    align-items: center;
    justify-content: center;
`
const PicturePlaceholder = styled.TouchableOpacity`
    background-color: #E1E1E1;
    width: 200px;
    height: 200px;
    border-radius: 100px;
    flex: 1;
    align-items: center;
    justify-content: center;
`
const PictureLabel = styled.Text`
    color: #857FCF;
    font-weight: 700;
    font-size: 60px;
`

const BirthdayInput = styled.TouchableOpacity`
    border: 2px solid #857FCF;
    padding: 5px 10px;
    margin: 0 0 20px;
    height: 50px;
    flex: 1;
    justify-content: center;
`


const Label = styled.Text`
    margin: 0 0 10px;
    color: #857FCF;
    font-weight: 700;
`
const Submit = styled.Button`
    width: 100%;
    background-color: #857FCF;
    padding: 5px 10px;
    margin: 0 0 20px;
    color: #FFF;
    height: 50px;
`;

const Validation = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(133, 127, 207, 0.9);
    z-index: 2;
    flex: 1;
    align-items: center;
    justify-content: center;
`;

class Subscription extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.user)
        this.state = {
            image: this.props.user ? this.props.user.picture : null,
            email: {
                value: this.props.user ? this.props.user.email : '',
                validate: false,
                hasBeenTyped: false,
            },
            birthday: this.props.user ? new Date(this.props.user.dateOfBirth) : new Date(),
            birthdayLabel: 'Date de naissance',
            firstname: {
                value: this.props.user ? this.props.user.firstname : '',
                validate: false,
                hasBeenTyped: false,
            },
            lastname: {
                value: this.props.user ? this.props.user.lastname : '',
                validate: false,
                hasBeenTyped: false,
            },
            password: {
                value: this.props.user ? this.props.user.pwd : '',
                validate: false,
                hasBeenTyped: false,
            }
        };
        this.onBirthdayPress = this.onBirthdayPress.bind(this)
        this.setDate = this.setDate.bind(this)
        this.handleFirstname = this.handleFirstname.bind(this)
        this.handleLastname = this.handleLastname.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
    }

    handleFirstname = (firstname) => {
        if(firstname.length === 0){
            this.setState({ firstname: {
                value: firstname,
                validate: false,
                hasBeenTyped: true
            }})
        }
        else{
            this.setState({ firstname: {
                value: firstname,
                validate: true,
                hasBeenTyped: true
            }})
        }
    }

    handleLastname = (lastname) => {
        if(lastname.length === 0){
            this.setState({ lastname: {
                value: lastname,
                validate: false,
                hasBeenTyped: true
            }})
        }
        else{
            this.setState({ lastname: {
                value: lastname,
                validate: true,
                hasBeenTyped: true
            }})
        }
    }

    handlePassword = (password) => {
        if(password.length === 0){
            this.setState({ password: {
                value: password,
                validate: false,
                hasBeenTyped: true
            }})
        }
        else{
            this.setState({ password: {
                value: password,
                validate: true,
                hasBeenTyped: true
            }})
        }
    }

    handleEmail = (email) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(email) === false)
        {
            this.setState({ email: { value: email, validate: false,
                hasBeenTyped: true } })
        }
        else {

            this.setState({ email: { value: email, validate: true,
                hasBeenTyped: true } })
        }
    }


    async onBirthdayPress() {
        try {
            let label, birthday
                const {action, year, month, day} = await DatePickerAndroid.open({
                    date: new Date(),
                });
                if (action !== DatePickerAndroid.dismissedAction) {
                    birthday = new Date(year, month, day);
                    label = birthday.toLocaleDateString();
                }
                this.setState({birthday: birthday, birthdayLabel: label});
        }
        catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }

    setDate(newDate) {
        let label = newDate.toLocaleDateString();
        this.setState({birthday: newDate, birthdayLabel: label})
    }

    createUserCall = async () => {
        let param = {email: this.state.email.value, dateOfBirth: this.state.birthday, firstname: this.state.firstname.value, lastname: this.state.lastname.value, pwd: this.state.password.value, picture: this.state.image}
        if(!this.props.user){
            await this.props.createUser(param)

            AsyncStorage.setItem('id', this.props.user._id)
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Welcome'})],
            });

            this.props.navigation.dispatch(resetAction);
        }
        else{
            await this.props.updateUser(this.props.user._id, param)
            this.props.navigation.goBack()
        }
    }


    pickImage = async () => {
        try {
            const { Camera, Permissions } = Expo;
            let status = await Permissions.askAsync(Permissions.CAMERA)
            let statusRoll = await Permissions.askAsync(Permissions.CAMERA_ROLL)
            console.log(status)
            if(status.status === 'granted' && statusRoll.status === "granted"){
                let result = await ImagePicker.launchCameraAsync({
                    allowsEditing: true,
                });

                console.log(result)

                if (!result.cancelled) {
                    this.setState({ image: result.uri });
                }
            }
        }

        catch (e) {
            console.log(e)
        }
    };

    render() {
        return (
            <KeyboardAwareScrollView>
                    <ContainerPicture>
                        {!this.state.image &&
                        <PicturePlaceholder onPress={this.pickImage}>
                            <PictureLabel>+</PictureLabel>
                        </PicturePlaceholder>}
                        {this.state.image &&
                        <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200, borderRadius: 100 }} />}
                    </ContainerPicture>
                    <View style={styles.container}>
                        <Container>
                            <Label>
                                Prénom
                            </Label>
                            <Input
                                validate={this.state.firstname.validate}
                                hasBeenTyped={this.state.firstname.hasBeenTyped}
                                placeholder="Prénom"
                                value={this.state.firstname.value}
                                underlineColorAndroid="transparent"
                                onChangeText={this.handleFirstname}
                            />
                            <Label>
                                Nom
                            </Label>
                            <Input
                                validate={this.state.lastname.validate}
                                hasBeenTyped={this.state.lastname.hasBeenTyped}
                                placeholder="Nom"
                                value={this.state.lastname.value}
                                    underlineColorAndroid="transparent"
                                onChangeText={this.handleLastname}
                            />
                            <Label>
                                Mot de passe
                            </Label>
                            <Input
                                validate={this.state.password.validate}
                                hasBeenTyped={this.state.password.hasBeenTyped}
                                placeholder="Mot de passe"
                                value={this.state.password.value}
                                underlineColorAndroid="transparent"
                                onChangeText={this.handlePassword}
                                secureTextEntry={true}
                            />
                            <Label>
                                Email
                            </Label>
                            <Input
                                validate={this.state.email.validate}
                                hasBeenTyped={this.state.email.hasBeenTyped}
                                placeholder="Email"
                                value={this.state.email.value}
                                underlineColorAndroid="transparent"
                                onChangeText={(text) => this.handleEmail(text)}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            <Label>
                                Date de naissance
                            </Label>
                            {Platform.OS === "android" &&
                            <BirthdayInput
                                onPress={this.onBirthdayPress}
                            >
                                <Text>{this.state.birthdayLabel}</Text>
                            </BirthdayInput>}
                            {Platform.OS === "ios" &&
                            <DatePickerIOS
                                date={this.state.birthday}
                                onDateChange={this.setDate}
                                mode="date"
                                locale="fr"
                            />}

                            <Submit
                                color="#857FCF"
                                onPress={this.createUserCall}
                                title="Valider"
                            />
                        </Container>
                    </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
        paddingBottom: 30,
    }
});

mapStateToProps = (state) => {
    return {
        user: state.user.user
    }
}

mapDispatchToProps = (dispatch) => {
    return {
        createUser: (param) => createUser(dispatch, param),
        updateUser: (userId, param) => updateUser(dispatch, userId, param),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Subscription)