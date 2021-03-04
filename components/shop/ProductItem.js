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
import Colors from '../../constants/Colors';

const ProductItem = ({ imageUrl, title, price, onViewDetail, onAddToCart }) => {
    let TouchableComponent = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComponent = TouchableNativeFeedback;
    }

    return (
        <View style={styles.product}>
            <View style={styles.touchable}>
                <TouchableComponent onPress={onViewDetail} useForeground>
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
                            <Button
                                color={Colors.primary}
                                title='View Details'
                                onPress={onViewDetail}
                            />
                            <Button
                                color={Colors.primary}
                                title='To Cart'
                                onPress={onAddToCart}
                            />
                        </View>
                    </View>
                </TouchableComponent>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 7,
        borderRadius: 15,
        backgroundColor: 'white',
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
        height: '15%',
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
        height: '25%',
        paddingHorizontal: 20
    }
});

export default ProductItem;