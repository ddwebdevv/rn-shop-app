import React, { useEffect, useState } from 'react';
import { FlatList, Platform, ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import OrderItem from '../../components/shop/OrderItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';

import { fetchOrders } from '../../store/actions/orders';
import Colors from '../../constants/Colors';


const OrdersScreen = () => {
    const [isLoading, setIsLoading] = useState(false);

    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        dispatch(fetchOrders()).then(() => {
            setIsLoading(false);
        });
    }, [dispatch]);

    if (isLoading) {
        return <View style={styles.centered}>
            <ActivityIndicator
                size='large'
                color={Colors.primary}
            />
        </View>
    }

    if (orders.length === 0) {
        return <View style={styles.centered}>
            <Text>No orders found. Maybe start ordering</Text>
        </View>
    }

    return (
        <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
                <OrderItem
                    amount={item.totalAmount}
                    date={item.readableDate}
                    items={item.items}
                />
            }
        />
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export const ordersScreenOptions = navData => ({
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