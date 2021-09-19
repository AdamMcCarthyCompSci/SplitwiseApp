import React from 'react';
import { FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Layout, Text, Icon, Input, Select, IndexPath, SelectItem, Card, Divider, Autocomplete, AutocompleteItem, CheckBox } from '@ui-kitten/components';
import { Linking } from 'react-native';

const Stack = createNativeStackNavigator();

export default function Register(props) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [remember, setRemember] = React.useState(false);

    return (
    <Layout style={{flex: 1, flexDirection: 'column'}}>
        <Layout style={{flex: 10}}>
                <Layout style={{flex: 1, flexDirection: 'column'}}>
                    <Layout style={{flex: 3, justifyContent: "center"}} level='1'>
                        <Input
                        placeholder='Email'
                        value={email}
                        onChangeText={value => setEmail(value)}
                        />
                    </Layout>
                    <Layout style={{flex: 3, justifyContent: "center"}} level='1'>
                        <Input
                        placeholder='Password'
                        value={password}
                        onChangeText={value => setPassword(value)}
                        />
                    </Layout>
                    <Layout style={{flex: 2, justifyContent: "center"}} level='1'>
                        <CheckBox
                        status='primary'
                        checked={remember}
                        onChange={value => setRemember(value)}>
                            Remember me?
                        </CheckBox>
                    </Layout>
                    <Layout style={{flex: 2, justifyContent: "center"}} level='1'>
                        <Button>
                            Register
                        </Button>
                    </Layout>
                    <Layout style={{flex: 2, justifyContent: "center"}} level='1'>
                    <Text style={{color: 'blue'}} onPress={() => Linking.openURL('http://google.com')}>Forgot Password?</Text>
                    </Layout>
                </Layout>
        </Layout>
        <Layout style={{flex: 5}} level='4'/>
        <Layout style={{flex: 3, justifyContent: "center"}} level='1'>
                <Text>Don't have an account yet?</Text>
                <Button
                onPress={() => {
                    props.navigation.replace('Register')
                }}
                >Register</Button>
        </Layout>
    </Layout>
    )
}