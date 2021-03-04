import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';

const ProductOverViewScreen = () => {
    const products = useSelector(state => state.products.availableProducts);
    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
                <ProductItem
                    imageUrl={item.imageUrl}
                    title={item.title}
                    price={item.price}
                    onViewDetail={() => {}}
                    onAddToCart={() => {}}
                />
            }
        />
    );
};

const styles = StyleSheet.create({
    
});

ProductOverViewScreen.navigationOptions = {
    headerTitle: 'All Products'
};

export default ProductOverViewScreen;