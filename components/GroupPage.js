import React from 'react';
import ExpenseItem from "./ExpenseItem";
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Layout, Icon } from '@ui-kitten/components';
import { ThemeContext } from '../ThemeContext';

const Stack = createNativeStackNavigator();

export default function GroupPage(props) {

  const PlusCircleOutlineIcon = (props) => (
    <Icon {...props} name='plus-circle-outline'/>
  );

  const themeContext = React.useContext(ThemeContext);

  return (
    <Layout style={{flex: 1, flexDirection: 'column'}}>
      
      <Layout style={{flex: 2}}>
      <Button onPress={() => {
                themeContext.toggleTheme()
      }}>Toggle Dark Mode</Button>
      </Layout>

      <Layout style={{flex: 2}}>
      <Button onPress={() => {
                props.navigation.navigate('AddExpense', {group: props.route.params.group})
      }}
      accessoryLeft={PlusCircleOutlineIcon}>
      Add Expense
    </Button>
      </Layout>

      <Layout style={{flex: 10}}>
      <FlatList
      data={
        [...Array(20)].map((index, row) => (
              {key: row.toString(),
              title: 'shopping'}
        ))}
      renderItem={({item, index}) => <ExpenseItem style={styles.item} key={index} index={index} title={item.title} navigation={props.navigation}/>}
      />
      </Layout>
      
      <Layout style={{flex: 1}}/>

    </Layout>
  );
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
