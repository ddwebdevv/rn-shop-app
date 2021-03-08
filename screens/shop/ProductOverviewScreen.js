import React from 'react';
import { StyleSheet, FlatList, Button, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import * as CartActions from '../../store/actions/cart';

import Colors from '../../constants/Colors';

const ProductOverViewScreen = ({ navigation }) => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const selectItemHandler = (id, title) => {
        navigation.navigate('ProductDetail', {
            productId: id,
            productTitle: title
        });
    };

    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
                <ProductItem
                    imageUrl={item.imageUrl}
                    title={item.title}
                    price={item.price}
                    onSelect={() => {
                        selectItemHandler(item.id, item.title);
                    }}
                >
                    <Button
                        color={Colors.primary}
                        title='View Details'
                        onPress={() => {
                            selectItemHandler(item.id, item.title);
                        }}
                    />
                    <Button
                        color={Colors.primary}
                        title='To Cart'
                        onPress={() => {
                            dispatch(CartActions.addToCart(item));
                        }}
                    />
                </ProductItem>
            }
        />
    );
};

const styles = StyleSheet.create({

});

ProductOverViewScreen.navigationOptions = navData => ({
    headerTitle: 'All Products',
    headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
            title='Menu'
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => {
                navData.navigation.toggleDrawer();
            }}
        />
    </HeaderButtons>,
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