import { StatusBar } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Loading from './components/Loading';
import Gallery from './components/Gallery';
import Cam from './components/Cam';
import Photo from './components/Photo';
import Address from './components/Address';

const Stack = createNativeStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <NavigationContainer>
        <StatusBar />
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="loading" component={Loading} />
          <Stack.Screen
            options={{
              title: 'Gallery',
              headerStyle: { backgroundColor: '#2196F3' },
              headerTintColor: '#ffffff',
              headerTitleStyle: { fontWeight: "bold" }
            }}
            name="gallery"
            component={Gallery} />
          <Stack.Screen
            options={{
              title: 'Camera',
              headerStyle: { backgroundColor: '#2196F3' },
              headerTintColor: '#ffffff',
              headerTitleStyle: { fontWeight: "bold" }
            }}
            name="camera"
            component={Cam} />
          <Stack.Screen
            options={{
              title: 'Selected Photo',
              headerStyle: { backgroundColor: '#2196F3' },
              headerTintColor: '#ffffff',
              headerTitleStyle: { fontWeight: "bold" }
            }}
            name="photo"
            component={Photo} />
          <Stack.Screen
            options={{
              title: 'Adres and port',
              headerStyle: { backgroundColor: '#2196F3' },
              headerTintColor: '#ffffff',
              headerTitleStyle: { fontWeight: "bold" }
            }}
            name="adres"
            component={Address} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}