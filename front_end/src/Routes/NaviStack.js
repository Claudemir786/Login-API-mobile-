import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator} from "@react-navigation/stack";
import Login from "../Pages/Login";
import PagInit from "../Pages/PagInit";

const Stack = createStackNavigator();

export default function NaviStack(){

    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:false}}>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Init" component={PagInit}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}