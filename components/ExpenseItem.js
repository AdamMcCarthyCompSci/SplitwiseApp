import React from 'react';
import ExpenseDetails from "./ExpenseDetails";
import { StyleSheet, Text, View, FlatList, TextPropTypes } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Layout } from '@ui-kitten/components';

const Stack = createNativeStackNavigator();

export default function ExpenseItem(props) {
    return (
        <Layout style={{flex: 1, flexDirection: 'row'}}>
            <Layout style={{ flex: 1 }}>
            </Layout>
            <Layout style={{ flex: 1}}/>
            <Layout style={{ flex: 5}}>
            <Button
            onPress={() => {
                props.navigation.navigate('ExpenseDetails', {key: props.index, title: props.title})
            }}
            >
              {props.title}
            </Button>
            </Layout>
            <Layout style={{ flex: 2}}/>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: '#fff',
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    }
  });