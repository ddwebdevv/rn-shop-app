import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform
} from 'react-native';

import Card from '../UI/Card';

const ProductItem = ({ imageUrl, title, price, onSelect, children }) => {
    let TouchableComponent = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComponent = TouchableNativeFeedback;
    }

    return (
        <Card style={styles.product}>
            <View style={styles.touchable}>
                <TouchableComponent onPress={onSelect} useForeground>
                    <View>
                        <Image
                            style={styles.image}
                            source={{ uri: imageUrl }}
                        />
                        <View style={styles.details}>
                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.price}>${price.toFixed(2)}</Text>
                        </View>
                        <View style={styles.actions}>
                            {children}
                        </View>
                    </View>
                </TouchableComponent>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    product: {
        height: 300,
        margin: 20,
        overflow: 'hidden'
    },
    touchable: {
        overflow: 'hidden',
        borderRadius: 15
    },
    image: {
        width: '100%',
        height: '60%'
    },
    details: {
        alignItems: 'center',
        height: '17%',
        padding: 5
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        marginVertical: 2
    },
    price: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: '#888'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '23%',
        paddingHorizontal: 20
    }
});

export default ProductItem;