import React, { useEffect, useCallback, useReducer, useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, ScrollView, View, Platform, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import Input from '../../components/UI/Input';

import { createProduct, updateProduct } from '../../store/actions/products';
import CustomHeaderButton from '../../components/UI/HeaderButton';

const formReducer = (state, action) => {
    if (action.type === 'UPDATE') {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};


const EditProductScreen = ({ navigation }) => {
    const prodId = navigation.getParam('productId');
    const dispatch = useDispatch();

    const editedProduct = useSelector(state =>
        state.products.userProducts.find(product => product.id === prodId)
    );
    
    //creating initial state for whole form instead many states
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: ''
        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false
        },
        formIsValid: editedProduct ? true : false
    });

    const { title, price, description, imageUrl } = formState.inputValues;


    //usint useReducer instead
    // const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    // const [titleIsValid, setTitleIsValid] = useState(false);
    // const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    // const [price, setPrice] = useState('');
    // const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');

    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong input!', 'Please check errors in the form.', [
                { text: 'Okay' }
            ]);
            return;
        }
        if (editedProduct) {
            dispatch(updateProduct(prodId, title, description, imageUrl));
        } else {
            //+ - converting to number
            dispatch(createProduct(title, description, imageUrl, +price));
        }
        navigation.goBack();
    }, [dispatch, prodId, formState]);

    useEffect(() => {
        navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: 'UPDATE',
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        });
    }, [dispatchFormState]);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior='padding'
            keyboardVerticalOffset={100}
        >
            <ScrollView>
                <View style={styles.formContainer}>
                    <Input
                        id='title'
                        label='Title'
                        errorText='Please enter valid title'
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.title : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    <Input
                        id='imageUrl'
                        label='ImageUrl'
                        errorText='Please enter valid imageUrl'
                        keyboardType='default'
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.imageUrl : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    {editedProduct ? null : <Input
                        id='price'
                        label='Price'
                        errorText='Please enter valid price'
                        keyboardType='decimal-pad'
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        min={0.1}
                    />}
                    <Input
                        id='description'
                        label='Description'
                        errorText='Please enter valid description'
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        multiline
                        numberOfLines={3}
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.description : ''}
                        initiallyValid={!!editedProduct}
                        required
                        minLength={5}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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
    }
});

export default EditProductScreen;