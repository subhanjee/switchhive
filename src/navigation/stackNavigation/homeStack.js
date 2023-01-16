import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../screens/home';
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="home"
        component={Home}
      />
    </Stack.Navigator>
  );
}
export default HomeStack;
