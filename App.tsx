import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Payment, Details  } from './src/screens';
import TabNavigator from './src/navigators/TabNavigator';

const stack = createNativeStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{headerShown: false}}>
        <stack.Screen name="TabNavigator" component={TabNavigator} options={{animation: 'slide_from_bottom'}} />
        <stack.Screen name="Details" component={Details} options={{animation: 'slide_from_bottom'}} />
        <stack.Screen name="Payment" component={Payment} options={{animation: 'slide_from_bottom'}} />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
