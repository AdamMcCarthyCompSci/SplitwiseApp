import React from 'react';
import ExpenseItem from "./ExpenseItem";
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Layout, Icon } from '@ui-kitten/components';
import { ThemeContext } from '../ThemeContext';

const Stack = createNativeStackNavigator();

export default function GroupList(props) {

  const themeContext = React.useContext(ThemeContext);

    const [groups, setGroups] = React.useState([{title: "Oldenburger Str. 9", members: [{name: "Ross"}, {name: "Adam"}, {name: "Tom"}, {name: "Darragh"}, {name: "Ronan"}, {name: "David"}, {name: "Joe"}]}])

  return (
    <Layout style={{flex: 1, flexDirection: 'column'}}>
      <FlatList
      data={
        groups.map((group, index) => (
              {key: index.toString(),
              group: group}
        ))}
      renderItem={({item, index}) =>                     
        <Button
        key={index}
        index={index}
        onPress={() => {
        props.navigation.navigate('GroupPage', {group: item.group})
        }}>
          {item.group.title}
        </Button>}
      />
    </Layout>
  );
}
