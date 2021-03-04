import React from 'react';
import { StyleSheet, FlatList, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import * as CartActions from '../../store/actions/cart';

const ProductOverViewScreen = ({ navigation }) => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
                <ProductItem
                    imageUrl={item.imageUrl}
                    title={item.title}
                    price={item.price}
                    onViewDetail={() => {
                        navigation.navigate('ProductDetail', {
                            productId: item.id,
                            productTitle: item.title
                        });
                    }}
                    onAddToCart={() => {
                        dispatch(CartActions.addToCart(item));
                    }}
                />
            }
        />
    );
};

const styles = StyleSheet.create({
    
});

ProductOverViewScreen.navigationOptions = navData => ({
    headerTitle: 'All Products',
    headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
            title='Cart'
            iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            onPress={() => {
                navData.navigation.navigate('Cart');
            }}
        />
    </HeaderButtons>
});

export default ProductOverViewScreen;