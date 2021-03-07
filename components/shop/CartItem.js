import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartItem = ({ onRemove, quantity, title, amount, deletable }) => {

    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{quantity} </Text>
                <Text style={styles.text}> {title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.text}>{amount.toFixed(2)}</Text>
                {deletable && <TouchableOpacity
                    onPress={onRemove}
                    style={styles.deleteButton}
                >
                    <Ionicons
                        name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                        size={25}
                        color='red'
                    />
                </TouchableOpacity>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cartItem: {
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 7,
        borderRadius: 15,
        overflow: 'hidden',
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginBottom: 5
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    quantity: {
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 18
    },
    text: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    deleteButton: {
        marginLeft: 20
    }
});

export default CartItem;