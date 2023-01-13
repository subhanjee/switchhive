import {createStackNavigator} from '@react-navigation/stack';
import CreateAccount from '../../components/createAccount';
import LoginScreen from '../../screens/loginScreen';
// import DrawerNavigation from '../drawerNavigation';
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="createAccount"
        component={CreateAccount}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="main"
        component={LoginScreen}
      />
      {/* <Stack.Screen name="drawer" component={DrawerNavigation} /> */}
    </Stack.Navigator>
  );
}
export default MyStack;
