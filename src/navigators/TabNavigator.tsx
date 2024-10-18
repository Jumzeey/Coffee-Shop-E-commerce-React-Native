import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { Home, Cart, Favourite, OrderHistory } from '../screens';
import CustomIcons from '../comonents/CustomIcons';
import { COLORS } from '../theme/theme';
import { BlurView } from '@react-native-community/blur';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarHideOnKeyboard: true,
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: styles.tabBarStyle,
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarBackground:() => <BlurView overlayColor="transparent" blurAmount={15} style={styles.blurViewStyles}/>,
        }}>
            <Tab.Screen name="Home" component={Home} options={{
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarIcon: ({focused}) => (
                    <CustomIcons name="home" size={25} color={ focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}/>
                ),
            }}/>
            <Tab.Screen name="Cart" component={Cart} options={{
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarIcon: ({ focused }) => (
                    <CustomIcons name="cart" size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
                ),
            }} />
            <Tab.Screen name="Favourite" component={Favourite} options={{
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarIcon: ({ focused }) => (
                    <CustomIcons name="like" size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
                ),
            }} />
            <Tab.Screen name="History" component={OrderHistory} options={{
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarIcon: ({ focused }) => (
                    <CustomIcons name="bell" size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
                ),
            }} />
        </Tab.Navigator>
    );
};

export default TabNavigator;

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 80,
        position: 'absolute',
        backgroundColor: COLORS.primaryBlackRGBA,
        borderTopWidth: 0,
        elevation: 0,
        borderTopColor: 'transparent',
    },
    blurViewStyles: {
        position:'absolute',
        top:0,
        bottom:0,
        right:0,
        left:0,
    },
});
