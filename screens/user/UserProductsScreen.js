import React from 'react';
import { StyleSheet, Platform, Button, FlatList, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import { deleteProduct } from '../../store/actions/products';

import Colors from '../../constants/Colors';

const UserProductsScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const userProducts = useSelector(state => state.products.userProducts);

    const editProductHandler = (id) => {
        navigation.navigate('EditProduct', { productId: id });
    };

    const deleteHandler = (id) => {
        Alert.alert(
            'Are you sure?',
            'Do you really want to delete this item?',
            [
                { text: 'No', style: 'default' },
                { text: 'Yes', style: 'destructive', onPress: () => {
                    dispatch(deleteProduct(id));
                }}
            ]
        )
    };

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
                <ProductItem
                    imageUrl={item.imageUrl}
                    title={item.title}
                    price={item.price}
                    onSelect={() => {
                        editProductHandler(item.id);
                    }}
                >
                    <Button
                        color={Colors.primary}
                        title='Edit'
                        onPress={() => {
                            editProductHandler(item.id);
                        }}
                    />
                    <Button
                        color={Colors.primary}
                        title='Delete'
                        onPress={() => {
                            deleteHandler(item.id);
                        }}
                    />
                </ProductItem>
            }
        />
    );
};


UserProductsScreen.navigationOptions = navData => ({
    headerTitle: 'Your Products',
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
            title='Add'
            iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            onPress={() => {
                navData.navigation.navigate('EditProduct');
            }}
        />
    </HeaderButtons>
});

const styles = StyleSheet.create({

});

export default UserProductsScreen;