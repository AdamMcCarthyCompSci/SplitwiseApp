import React from 'react';
import { StyleSheet, View, FlatList, TextPropTypes } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Layout, Icon, Text } from '@ui-kitten/components';

const Stack = createNativeStackNavigator();

export default function ExpenseDetails({ navigation, route }) {
    const { key, title } = route.params;
    return (
        <Layout>
        <Text>{key + title}</Text>
        </Layout>
    )
}