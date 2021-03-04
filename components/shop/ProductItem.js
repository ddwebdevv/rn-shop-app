import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import Colors from '../../constants/Colors';

const ProductItem = ({ imageUrl, title, price, onViewDetail, onAddToCart }) => {

    return (
        <View style={styles.product}>
            <Image
                style={styles.image}
                source={{ uri: imageUrl }}
            />
            <View style={styles.details}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.price}>${price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
                <Button
                    color={Colors.primary}
                    title='View Details'
                    onPress={onViewDetail}
                />
                <Button
                    color={Colors.primary}
                    title='To Cart'
                    onPress={onAddToCart}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 7,
        borderRadius: 15,
        backgroundColor: 'white',
        height: 300,
        margin: 20,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '60%'
    },
    details: {
        alignItems: 'center',
        height: '15%',
        padding: 10
    },
    title: {
        fontSize: 20,
        marginVertical: 4
    },
    price: {
        fontSize: 15,
        color: '#888'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    }
});

export default ProductItem;