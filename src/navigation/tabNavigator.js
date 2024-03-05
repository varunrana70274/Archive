import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Explore from '../screens/Explore';
import { MyTabBar } from './tab';

const Tab = createBottomTabNavigator();
export function MyTabs() {
    return (
      <Tab.Navigator
      
        tabBarOptions={{
            
            style:{backgroundColor:'red'}
        }}
 tabBar={props => <MyTabBar {...props} />}
      >
        <Tab.Screen name="Home" component={Explore} />
        <Tab.Screen name="Like" component={Explore} />
        <Tab.Screen name="Add" component={Explore} />
        <Tab.Screen name="Chat" component={Explore} />
        <Tab.Screen name="User" component={Explore} />
        
      </Tab.Navigator>
    );
  }