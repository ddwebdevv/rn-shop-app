import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, TextInput, ScrollView, View, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import { createProduct, updateProduct } from '../../store/actions/products';
import CustomHeaderButton from '../../components/UI/HeaderButton';


const EditProductScreen = ({ navigation }) => {
    const prodId = navigation.getParam('productId');
    const dispatch = useDispatch();

    const editedProduct = useSelector(state =>
        state.products.userProducts.find(product => product.id === prodId)
    );

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');

    const submitHandler = useCallback(() => {
        if (editedProduct) {
            dispatch(updateProduct(prodId, title, description, imageUrl));
        } else {
            //+ - converting to number
            dispatch(createProduct(title, description, imageUrl, +price));
        }
        navigation.goBack();
    }, [dispatch, prodId, title, description, imageUrl, price]);

    useEffect(() => {
        navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    return (
        <ScrollView>
            <View style={styles.formContainer}>
                <View style={styles.formSection}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={text => setTitle(text)}
                    />
                </View>
                <View style={styles.formSection}>
                    <Text style={styles.label}>ImageURL</Text>
                    <TextInput
                        style={styles.input}
                        value={imageUrl}
                        onChangeText={text => setImageUrl(text)}
                    />
                </View>
                {editedProduct ? null : <View style={styles.formSection}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput
                        style={styles.input}
                        value={price}
                        onChangeText={text => setPrice(text)}
                    />
                </View>}
                <View style={styles.formSection}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={text => setDescription(text)}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

EditProductScreen.navigationOptions = ({ navigation }) => {
    const submit = navigation.getParam('submit');
    return {
        headerTitle: navigation.getParam('productId')
            ? 'Edit Product'
            : 'Add Product',
        headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title='Save'
                iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                onPress={submit}
            />
        </HeaderButtons>
    };
};

const styles = StyleSheet.create({
    formContainer: {
        margin: 20
    },
    formSection: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 5
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});

export default EditProductScreen;