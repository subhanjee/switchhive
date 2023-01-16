import {createStackNavigator} from '@react-navigation/stack';
import CreateAccount from '../../components/createAccount';
import LoginScreen from '../../screens/loginScreen';
import AppStack from '../drawerNavigation';
// import DrawerNavigation from '../drawerNavigation';
const Stack = createStackNavigator();

function OnboardingStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: 'card',
        headerShown: false,
      }}>
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
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}
export default OnboardingStack;
