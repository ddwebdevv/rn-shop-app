import React from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';

const ProductDetailScreen = ({ navigation }) => {
    const productId = navigation.getParam('productId');
    const selectedProduct = useSelector(state =>
        state.products.availableProducts.find(product => product.id === productId)
    );

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

ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
};

export default ProductDetailScreen;