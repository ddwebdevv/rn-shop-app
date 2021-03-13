import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import CartItem from '../../components/shop/CartItem';
import { removeFromCart } from '../../store/actions/cart';
import { addOrder } from '../../store/actions/orders';
import Card from '../../components/UI/Card';

import Colors from '../../constants/Colors';

const CartScreen = () => {
    const [isLoading, setIsLoading] = useState(false);

    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const cartToArray = [];
        for(const key in state.cart.items) {
            cartToArray.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            });
        }
        return cartToArray.sort((a, b) => a.productId > b.productId ? 1 : -1);
    });

    const dispatch = useDispatch();

    const sendOrderHandler = async () => {
        setIsLoading(true);

        await dispatch(addOrder(cartItems, cartTotalAmount));

        setIsLoading(false);
    }

    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
                </Text>
                {isLoading
                    ? <ActivityIndicator
                        size='small'
                        color={Colors.primary}
                    />
                    : <Button
                        title='Order Now'
                        color={Colors.secondary}
                        disabled={cartItems.length === 0}
                        onPress={sendOrderHandler}
                    />
                }
            </Card>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={({item}) => (
                    <CartItem
                        quantity={item.quantity}
                        title={item.productTitle}
                        amount={item.sum}
                        deletable
                        onRemove={() => {
                            dispatch(removeFromCart(item.productId));
                        }}
                    />
                )}
            />
        </View>
    );
};

CartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
};

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        marginBottom: 20
    },
    summaryText: {
        fontFamily: 'open-sans',
        fontSize: 18
    },
    amount: {
        fontFamily: 'open-sans-bold',
        fontSize: 26,
        color: Colors.price
    }
});

export default CartScreen;