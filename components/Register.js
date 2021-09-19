import React from 'react';
import { FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Layout, Text, Icon, Input, Select, IndexPath, SelectItem, Card, Divider, Autocomplete, AutocompleteItem, CheckBox } from '@ui-kitten/components';
import { Linking } from 'react-native';
// import { BACKEND_URL } from '@env';

const Stack = createNativeStackNavigator();
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const capitalRegex = /^(?=.*[A-Z])/;
const specialRegex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

export default function Register(props) {

    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [emailCondition, setEmailCondition] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');
    const [passwordConditions, setPasswordConditions] = React.useState({
        length: false,
        capital: false,
        special: false
    })
    const [passwordConfirmCondition, setPasswordConfirmCondition] = React.useState(false);
    const [terms, setTerms] = React.useState(false);

    const checkPassword = (value) => {
        setPassword(value);
        
        if (value !== passwordConfirm) {
            setPasswordConfirmCondition(false);
        }
        else {
            setPasswordConfirmCondition(true);
        }

        if (value !== "") {
            if (value.length > 6) {
                setPasswordConditions(passwordConditions => ({...passwordConditions, length: true}))
            }
            else {
                setPasswordConditions(passwordConditions => ({...passwordConditions, length: false}))
            }

            if (value.match(capitalRegex)) {
                setPasswordConditions(passwordConditions => ({...passwordConditions, capital: true}))
            }
            else {
                setPasswordConditions(passwordConditions => ({...passwordConditions, capital: false}))
            }

            if (value.match(specialRegex)) {
                setPasswordConditions(passwordConditions => ({...passwordConditions, special: true}))
            }
            else {
                setPasswordConditions(passwordConditions => ({...passwordConditions, special: false}))
            }
        }
        else {
            setPasswordConditions({length: false, capital: false, special: false}) 
        }
    }

    const checkPasswordConfirm = (value) => {
        setPasswordConfirm(value);
        if (value === password) {
            setPasswordConfirmCondition(true);
        }
        else {
            setPasswordConfirmCondition(false);
        }
    }

    const checkEmail = (value) => {
        setEmail(value);

        if (value.match(emailRegex)) {
            setEmailCondition(true);
        }
        else {
            setEmailCondition(false);
        }
    }

    return (
    <Layout style={{flex: 1, flexDirection: 'column'}}>
        <Layout style={{flex: 10}}>
                <Layout style={{flex: 1, flexDirection: 'column'}}>
                    <Layout style={{flex: 2, justifyContent: "center"}} level='1'>
                        <Input
                        placeholder='Username'
                        value={username}
                        onChangeText={value => setUsername(value)}
                        />
                    </Layout>
                    <Layout style={{flex: 2, justifyContent: "center"}} level='1'>
                        <Input
                        placeholder='Email'
                        value={email}
                        onChangeText={value => checkEmail(value)}
                        />
                        {
                        (email !== "")
                         && 
                         (
                        <Text status={emailCondition ? "success" : "danger"}>{emailCondition ? "Valid email" : "Invalid email"}</Text>
                         )
                        }
                    </Layout>
                    <Layout style={{flex: 8, justifyContent: "center"}} level='1'>
                        <Input
                        placeholder='Password'
                        value={password}
                        onChangeText={value => checkPassword(value)}
                        />
                        {
                        (password !== "")
                         && 
                         (
                        <>
                        <Text status={passwordConditions.length ? "success" : "danger"}>Longer than 6 characters</Text>
                        <Text status={passwordConditions.capital ? "success" : "danger"}>Capital letter</Text>
                        <Text status={passwordConditions.special ? "success" : "danger"}>Special character</Text>
                        </>
                        )
                        }
                        <Input
                        placeholder='Confirm Password'
                        value={passwordConfirm}
                        onChangeText={value => checkPasswordConfirm(value)}
                        />
                        {
                            (passwordConfirm !== "")
                            &&
                            <>
                            <Text status={passwordConfirmCondition ? "success" : "danger"}>Passwords must match</Text>
                            </>
                        }
                    </Layout>
                    <Layout style={{flex: 2, justifyContent: "center"}} level='1'>
                        <CheckBox
                        status='primary'
                        checked={terms}
                        onChange={value => setTerms(value)}>
                            I have read the <Text style={{color: 'blue'}} onPress={() => Linking.openURL('http://google.com')}>terms and conditions.</Text>
                        </CheckBox>
                    </Layout>
                    <Layout style={{flex: 2, justifyContent: "center"}} level='1'>
                        <Button>
                            Register
                        </Button>
                    </Layout>
                </Layout>
        </Layout>
        <Layout style={{flex: 1}} level='4'/>
        <Layout style={{flex: 1, justifyContent: "center"}} level='1'>
                <Text>Already have an account?</Text>
                <Button
                onPress={() => {
                    props.navigation.replace('Login')
                }}
                >Sign in</Button>
        </Layout>
    </Layout>
    )
}