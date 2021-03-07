import React from 'react';
import { Text, FlatList, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/UI/HeaderButton';


const OrdersScreen = () => {
    const orders = useSelector(state => state.orders.orders);
    return (
        <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={({ item }) => 
                <Text>{item.totalAmount}</Text>
            }
        />
    );
};

OrdersScreen.navigationOptions = navData => ({
    headerTitle: 'Your Orders',
    headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
            title='Menu'
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => {
                navData.navigation.toggleDrawer();
            }}
        />
    </HeaderButtons>,
});

export default OrdersScreen;