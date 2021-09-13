import React from 'react';
import { FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Layout, Text, Icon, Input, Select, IndexPath, SelectItem, Card, Divider, Autocomplete, AutocompleteItem } from '@ui-kitten/components';

const Stack = createNativeStackNavigator();

const expenseSplitData = [
    "Paid by you and split equally.",
    "They owe the full amount.",
    "Paid by NAME, split equally.",
    "Paid by NAME, you owe the full amount.",
    "More Options."
  ];

const filter = (item, query) => item.name.toLowerCase().includes(query.toLowerCase());

export default function AddExpense({ navigation, route }) {
    const { group } = route.params;

    const [expenseTitle, setExpenseTitle] = React.useState('');
    const [expenseValue, setExpenseValue] = React.useState('');

    const [selectedPayer, setSelectedPayer] = React.useState(null);
    const [payersList, setPayersList] = React.useState(group.members);

    const [selectedPayee, setSelectedPayee] = React.useState(null);
    const [payeesList, setPayeesList] = React.useState(group.members);

    const [payers, setPayers] = React.useState([group.members[0]]);
    const [payees, setPayees] = React.useState(group.members)

    const ShoppingBagIcon = (props) => (
        <Icon {...props} name='shopping-bag-outline'/>
      );

    const CalendarIcon = (props) => (
        <Icon {...props} name='calendar-outline'/>
    );

    const GroupIcon = (props) => (
        <Icon {...props} name='people-outline'/>
    );

    const NotesIcon = (props) => (
        <Icon {...props} name='clipboard-outline'/>
    );

    const CameraIcon = (props) => (
        <Icon {...props} name='camera-outline'/>
    );

    const CloseIcon = (props) => (
        <Icon {...props} name='close-outline'/>
    );

    const PaymentIcon = (props) => (
        <Icon {...props} name='credit-card-outline'/>
    );
    
    const onSelectPayers = (index) => {
        setSelectedPayer(null);
        setPayersList(group.members);
        setPayers([...payers, {name: group.members[index].name}]);
      };

    const onChangePayers = (query) => {
        setSelectedPayer(query);
        setPayersList(group.members.filter(item => filter(item, query)));
      };

    const onSelectPayees = (index) => {
        setSelectedPayee(null);
        setPayeesList(group.members);
        setPayees([...payees, {name: group.members[index].name}]);
      };
    
    const onChangePayees = (query) => {
        setSelectedPayee(query);
        setPayeesList(group.members.filter(item => filter(item, query)));
      };

      const renderAutocompleteItem = (item, index) => (
        <AutocompleteItem
          key={index}
          title={item.name}
        />
      );

    return (
        <Layout style={{flex: 1, flexDirection: 'column'}}>

            <Layout style={{flex: 1, justifyContent: 'center'}} level='3'>
                <Button accessoryLeft={GroupIcon}>{group.title}</Button>
            </Layout>

            <Layout style={{flex: 1}} level='4'>
            <Layout style={{flex: 1, flexDirection: 'row', alignItems: 'center'}} level='2'>
                <Layout style={{flex: 1}}>
                    <Button accessoryLeft={ShoppingBagIcon}/>
                </Layout>
                <Layout style={{flex:6}}>
                    <Input
                    placeholder='Expense Title'
                    value={expenseTitle}
                    onChangeText={value => setExpenseTitle(value)}
                    />
                </Layout>
            </Layout>
            </Layout>

            <Layout style={{flex: 1}} level='4'>
            <Layout style={{flex: 1, flexDirection: 'row', alignItems: 'center'}} level='2'>
                <Layout style={{flex: 1}}>
                    <Button accessoryLeft={PaymentIcon}/>
                </Layout>
                <Layout style={{flex:6}}>
                    <Input
                    placeholder='Expense Value'
                    value={expenseValue.toString()}
                    onChangeText={(value) => {
                        setExpenseValue(value.toString())
                    }}
                    keyboardType="numeric"
                    />
                </Layout>
            </Layout>
            </Layout>

            <Layout style={{flex: 2}} level='4'>
                    <Card status='primary' style={{height: "100%"}}>
                    <Autocomplete
                    placeholder='Who Paid?'
                    value={selectedPayer}
                    onSelect={onSelectPayers}
                    onChangeText={onChangePayers}
                    onFocus={() => {
                        setSelectedPayer(null);
                        setPayersList(group.members);
                    }}>

                    {payersList.map(renderAutocompleteItem)}
                    </Autocomplete>

                    <FlatList
                        style={{height: "80%"}}
                        data={
                            payers.map((member, index) => (
                                {key: index.toString(),
                                name: member.name}
                            ))}
                        renderItem={({item, index}) =>                     
                        <Button appearance='outline' accessoryLeft={CloseIcon} onPress={() => {
                            setPayers(payers.filter((_, i) => i !== index))
                            }}>{item.name}</Button>}
                        /> 
                    </Card>             
            </Layout>

            <Layout style={{flex: 2}} level='4'>
            <Card status='primary' style={{height: "100%"}}>
                    <Autocomplete
                    placeholder='Who is splitting?'
                    value={selectedPayer}
                    onSelect={onSelectPayees}
                    onChangeText={onChangePayees}
                    onFocus={() => {
                        setSelectedPayee(null);
                        setPayeesList(group.members);
                    }}>

                    {payeesList.map(renderAutocompleteItem)}
                    </Autocomplete>

                    <FlatList
                        style={{height: "80%"}}
                        data={
                            payees.map((member, index) => (
                                {key: index.toString(),
                                name: member.name}
                            ))}
                        renderItem={({item, index}) =>                     
                        <Button appearance='outline' accessoryLeft={CloseIcon} onPress={() => {
                            setPayees(payees.filter((_, i) => i !== index))
                            }}>{item.name}</Button>}
                        /> 
                    </Card>             
            </Layout>

            <Layout style={{flex: 1}} level='4'>
                <Layout style={{flex: 1, flexDirection: 'row', alignItems: 'center'}} level='2'>
                    <Layout style={{flex: 1}}/>
                    <Layout style={{flex: 10}}>
                        <Button accessoryLeft={CalendarIcon}/>
                    </Layout>
                    <Layout style={{flex: 1}}/>
                    <Layout style={{flex: 10}}>
                        <Button accessoryLeft={NotesIcon}/>
                    </Layout>
                    <Layout style={{flex: 1}}/>
                    <Layout style={{flex: 10}}>
                    <Button accessoryLeft={CameraIcon}/>
                    </Layout>
                    <Layout style={{flex: 1}}/>
                </Layout>
            </Layout>

        </Layout>
    )
}