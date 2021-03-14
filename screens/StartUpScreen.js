import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import { authenticate } from '../store/actions/auth';

const StartUpScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                navigation.navigate('Auth');
                return;
            }
            const transformedData = JSON.parse(userData);
            const { token, userId, expirationDate} = transformedData;

            const expDate = new Date(expirationDate);

            if (expDate <= new Date() || !token || !userId) {
                navigation.navigate('Auth');
                return;
            }
            
            const expirationTime = expirationDate.getTime() - new Date().getTime;

            navigation.navigate('Shop');
            dispatch(authenticate(userId, token, expirationTime));
        };

        tryLogin();
    }, [dispatch]);

    return (
        <View style={styles.centered}>
            <ActivityIndicator
                size='large'
                color={Colors.primary}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartUpScreen;