import {createStackNavigator} from '@react-navigation/stack';
import CreateAccount from '../../components/createAccount';
import GiftCardsScreen from '../../screens/giftCardsScreen';
import LoginScreen from '../../screens/loginScreen';
import SwitHiveCardsScreen from '../../screens/switcHiveCardsScreen';
import TopUpCardsScreen from '../../screens/topupCardScreen';
import AppStack from '../drawerNavigation';
// import DrawerNavigation from '../drawerNavigation';
const Stack = createStackNavigator();

function OnboardingStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: 'card',
        // headerShown: false,
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
      <Stack.Screen
        options={{headerShown: false}}
        name="App"
        component={AppStack}
      />
      <Stack.Screen name="TopUpCards" component={TopUpCardsScreen} />
      <Stack.Screen name="GiftCards" component={GiftCardsScreen} />
      <Stack.Screen name="SwitHiveCards" component={SwitHiveCardsScreen} />
    </Stack.Navigator>
  );
}
export default OnboardingStack;
