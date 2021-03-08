import React from 'react';
import { StyleSheet, View } from 'react-native';

const Card = ({ children, style }) => {
    return (
        <View style={{
            ...styles.card,
            ...style
        }}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 7,
        borderRadius: 15,
        backgroundColor: 'white'
    }
});

export default Card;