import React from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as CartActions from '../../store/actions/cart';
import Colors from '../../constants/Colors';

const ProductDetailScreen = ({ route }) => {
    const productId = route.params.productId;
    const selectedProduct = useSelector(state =>
        state.products.availableProducts.find(product => product.id === productId)
    );
    const dispatch = useDispatch();

    return (
        <ScrollView>
            <Image
                style={styles.image}
                source={{ uri: selectedProduct.imageUrl }}
            />
            <View style={styles.actions}>
                <Button
                    color={Colors.primary}
                    title='Add To Cart'
                    onPress={() => {
                        dispatch(CartActions.addToCart(selectedProduct));
                    }}
                />
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    price: {
        fontFamily: 'open-sans-bold',
        fontSize: 24,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20
    },
    description: {
        fontFamily: 'open-sans',
        fontSize: 18,
        textAlign: 'center',
        marginHorizontal: 20
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    }
});

export const productDetailScreenOptions = ({ route }) => {
    return {
        headerTitle: route.params.productTitle
    }
};

export default ProductDetailScreen;