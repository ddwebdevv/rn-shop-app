import React from 'react';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import ProductOverViewScreen, { screenOptions } from '../screens/shop/ProductOverviewScreen';
import ProductDetailScreen, { productDetailScreenOptions } from '../screens/shop/ProductDetailScreen';
import CartScreen, { cartScreenOptions } from '../screens/shop/CartScreen';
import OrdersScreen, { ordersScreenOptions } from '../screens/shop/OrdersScreen';
import UserProductsScreen, { userProductsScreenOptions } from '../screens/user/UserProductsScreen';
import EditProductScreen, { editProductScreenOptions } from '../screens/user/EditProductScreen';
import AuthScreen, { authScreenOptions } from '../screens/user/AuthScreen';




import Colors from '../constants/Colors';
import StartUpScreen from '../screens/StartUpScreen';
import { logout } from '../store/actions/auth';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
    return <ProductsStackNavigator.Navigator
        screenOptions={defaultNavOptions}
    >
        <ProductsStackNavigator.Screen
            name="ProductsOverview"
            component={ProductOverViewScreen}
            options={screenOptions}
        />
        <ProductsStackNavigator.Screen
            name="ProductDetail"
            component={ProductDetailScreen}
            options={productDetailScreenOptions}
        />
        <ProductsStackNavigator.Screen
            name="Cart"
            component={CartScreen}
            options={cartScreenOptions}
        />
    </ProductsStackNavigator.Navigator>
};

// const ProductsNavigator = createStackNavigator({
//     ProductsOverview: ProductOverViewScreen,
//     ProductDetail: ProductDetailScreen,
//     Cart: CartScreen
// }, {
//     navigationOptions: {
//         drawerIcon: drawerConfig => <Ionicons
//             name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
//             size={25}
//             color={drawerConfig.tintColor}
//         />
//     },
//     defaultNavigationOptions: defaultNavOptions
// });

const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
    return <OrdersStackNavigator.Navigator
        screenOptions={defaultNavOptions}
    >
        <OrdersStackNavigator.Screen
            name='Orders'
            component={OrdersScreen}
            options={ordersScreenOptions}
        />
    </OrdersStackNavigator.Navigator>;
};


// const OrdersNavigator = createStackNavigator({
//     Orders: OrdersScreen
// }, {
//     navigationOptions: {
//         drawerIcon: drawerConfig => <Ionicons
//             name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
//             size={25}
//             color={drawerConfig.tintColor}
//         />
//     },
//     defaultNavigationOptions: defaultNavOptions
// });

const UserStackNavigator = createStackNavigator();

export const UserNavigator = () => {
    return <UserStackNavigator.Navigator
        screenOptions={defaultNavOptions}
    >
        <UserStackNavigator.Screen
            name='UserProducts'
            component={UserProductsScreen}
            options={userProductsScreenOptions}
        />
        <UserStackNavigator.Screen
            name='EditProduct'
            component={EditProductScreen}
            options={editProductScreenOptions}
        />
    </UserStackNavigator.Navigator>;
};

// const UserNavigator = createStackNavigator({
//     UserProducts: UserProductsScreen,
//     EditProduct: EditProductScreen
// }, {
//     navigationOptions: {
//         drawerIcon: drawerConfig => <Ionicons
//             name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
//             size={25}
//             color={drawerConfig.tintColor}
//         />
//     },
//     defaultNavigationOptions: defaultNavOptions
// });

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
    const dispatch = useDispatch();
    return <ShopDrawerNavigator.Navigator
        drawerContent={props => {
            return <View style={{ flex: 1, paddingTop: 20 }}>
                <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                    <DrawerItemList
                        {...props}
                    />
                    <Button
                        title='Logout'
                        color={Colors.primary}
                        onPress={() => {
                            dispatch(logout());
                            // props.navigation.navigate('Auth');
                        }}
                    />
                </SafeAreaView>
            </View>
        }}
        drawerContentOptions={{
            activeTintColor: Colors.primary
        }}
    >
        <ShopDrawerNavigator.Screen
            name='Products'
            component={ProductsNavigator}
            options={{
                drawerIcon: props => <Ionicons
                    name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    size={25}
                    color={props.color}
                />
            }}
        />
        <ShopDrawerNavigator.Screen
            name='Orders'
            component={OrdersNavigator}
            options={{
                drawerIcon: props => <Ionicons
                    name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                    size={25}
                    color={props.color}
                />
            }}
        />
        <ShopDrawerNavigator.Screen
            name='User'
            component={UserNavigator}
            options={{
                drawerIcon: props => <Ionicons
                    name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                    size={25}
                    color={props.color}
                />
            }}
        />
    </ShopDrawerNavigator.Navigator>;
};

// const ShopNavigator = createDrawerNavigator({
//     Products: ProductsNavigator,
//     Orders: OrdersNavigator,
//     User: UserNavigator
// }, {
//     contentOptions: {
//         activeTintColor: Colors.primary
//     },
//     contentComponent: props => {
//         const dispatch = useDispatch();
//         return <View style={{ flex: 1, paddingTop: 20 }}>
//             <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
//                 <DrawerItems
//                     {...props}
//                 />
//                 <Button
//                     title='Logout'
//                     color={Colors.primary}
//                     onPress={() => {
//                         dispatch(logout);
//                         props.navigation.navigate('Auth');
//                     }}
//                 />
//             </SafeAreaView>
//         </View>
//     }
// });

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
    return <AuthStackNavigator.Navigator
        screenOptions={defaultNavOptions}
    >
        <AuthStackNavigator.Screen
            name='Auth'
            component={AuthScreen}
            options={authScreenOptions}
        />
    </AuthStackNavigator.Navigator>
};

// const AuthNavigator = createStackNavigator({
//     Auth: AuthScreen
// }, {
//     defaultNavigationOptions: defaultNavOptions
// });

// const MainNavigator = createSwitchNavigator({
//     StartUp: StartUpScreen,
//     Auth: AuthNavigator,
//     Shop: ShopNavigator
// });

// export default createAppContainer(MainNavigator);