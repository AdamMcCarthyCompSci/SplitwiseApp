import React from 'react';
import Register from "./components/Register";
import Login from "./components/Login";
import GroupList from "./components/GroupList";
import GroupPage from "./components/GroupPage";
import ExpenseDetails from "./components/ExpenseDetails";
import AddExpense from "./components/AddExpense";
import { StyleSheet, View, FlatList } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { default as defaultTheme } from './SplitwiseTheme.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ThemeContext } from './ThemeContext';

const Stack = createNativeStackNavigator();

export default function App() {
  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  return (
    <>
    <IconRegistry icons={EvaIconsPack} />
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
    <ApplicationProvider {...eva} theme={{...eva[theme], ...defaultTheme}}>
    <NavigationContainer>
      <Stack.Navigator>
            <Stack.Screen
            name="Register"
            component={Register}
            />
            <Stack.Screen
            name="Login"
            component={Login}
            />
            <Stack.Screen
            name="GroupList"
            component={GroupList}
            />
            <Stack.Screen
            name="GroupPage"
            component={GroupPage}
            options={({route}) => ({title: route.params.title})}
            />
            <Stack.Screen 
            name="ExpenseDetails" 
            component={ExpenseDetails} 
            options={({ route }) => ({title: route.params.title})}
            />
            <Stack.Screen
            name="AddExpense"
            component={AddExpense}
            />
    </Stack.Navigator>
    </NavigationContainer>
    </ApplicationProvider>
    </ThemeContext.Provider>
    </>
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
