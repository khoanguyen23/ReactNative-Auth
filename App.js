import 'react-native-gesture-handler';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import {
  createDrawerNavigator, DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { StyleSheet, ToastAndroid, Image } from 'react-native';
import { Button, View, Text } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionic from 'react-native-vector-icons/Ionicons'
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import IconButton from './components/ui/IconButton';
import ProfileScreen from './screens/ProfileScreen';
// import MainContainer from './MainContainer';
import HomeScreen from './screens/HomeScreen';
import AddScreen from './screens/AddScreen';
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import ExpensesContextProvider from './store/expenses-context';
import * as SplashScreen from 'expo-splash-screen';


const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary800 },
        headerStyle: { backgroundColor: Colors.primary700 },
        // headerTitleStyle: {
        //   fontWeight: 'bold',
        //   alignSelf: 'center',
        // justifyContent: 'center'
        // },
        headerTitleAlign: 'center',
        headerTintColor: 'black',
        contentStyle: { backgroundColor: Colors.primary100 },
        contentStyle: { backgroundColor: Colors.primary700 },

      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  const Drawer = createDrawerNavigator();

  const Tabs = () => (
    <ExpensesContextProvider>
      
      <Tab.Navigator screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                style={styles.icon}
                source={
                  focused
                    ? require('./assets/home_active.png')
                    : require('./assets/home_inactive.png')
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name="Add"
          component={AddScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                style={styles.icon}
                source={
                  focused
                    ? require('./assets/home_active.png')
                    : require('./assets/home_inactive.png')
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name="Tasks"
          component={RecentExpenses}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                style={styles.icon}
                source={
                  focused
                    ? require('./assets/calendar_active.png')
                    : require('./assets/calendar_inactive.png')
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name="addtransaction"
          component={ManageExpense}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                style={styles.icon}
                source={
                  focused
                    ? require('./assets/calendar_active.png')
                    : require('./assets/calendar_inactive.png')
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name="totalExpenses"
          component={AllExpenses}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                style={styles.icon}
                source={
                  focused
                    ? require('./assets/calendar_active.png')
                    : require('./assets/calendar_inactive.png')
                }
              />
            ),
          }}
        />
      </Tab.Navigator>
      
    </ExpensesContextProvider>
  )
  function Article() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Article Screen</Text>
      </View>
    );
  }
  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Help" onPress={() => alert('Link to help')} />
        <Text onPress={authCtx.logout}>log out</Text>

      </DrawerContentScrollView>
    );
  }

  return (
    
    <Drawer.Navigator useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Expense Tracker App" component={Tabs}
      />
      <Drawer.Screen name="haa" component={Article} />
    </Drawer.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}

    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
      setIsTryingLogin(false);
    }
    fetchToken();
  }, []);
  if (isTryingLogin) {
    return <AppLoading />;
  }
  return <Navigation />;
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Settings Screen</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
}
const Tab = createBottomTabNavigator();
const SettingsStack = createNativeStackNavigator();

export default function App() {

  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>


    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});