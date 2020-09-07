import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

// import Screen
import Dashboard from "./containers/Dashboard";
import Map from "./containers/Map";
import Report from "./containers/Report";
import Filter from "./containers/Filter";
import DetailReport from "./containers/DetailReport";


// icon
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const DashboardStack = createStackNavigator();
const MapStack = createStackNavigator();
const ReportStack = createStackNavigator();

const Drawer = createDrawerNavigator();

const DashboardStackScreen = () =>  {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen name="Dashboard" component={Dashboard} />
    </DashboardStack.Navigator>
  );
}

const MapStackScreen = () =>  {
  return (
    <MapStack.Navigator>
      <MapStack.Screen options={{headerShown: false}} name="Map" component={Map} />
      <MapStack.Screen name="Filter" component={Filter} />
    </MapStack.Navigator> 
  );
}

const ReportStackScreen = () =>  {
  return (
    <ReportStack.Navigator>
      <ReportStack.Screen name="Predict Report" component={Report} />
      <ReportStack.Screen name="DetailReport" component={DetailReport} />
    </ReportStack.Navigator> 
  );
}

const Router = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
      initialRouteName="Dashboard"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {

            if (route.name === 'Map') {
              return <Feather name="map" size={size} color={color} />;
            } else if (route.name === 'Dashboard') {
              return <Feather name="home" size={size} color={color} />;
            } else if(route.name === 'Report') {
              return <AntDesign name="linechart" size={size} color={color} />;
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Map" component={MapStackScreen} />
        <Tab.Screen name="Dashboard" component={DashboardStackScreen} />
        <Tab.Screen name="Report" component={ReportStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Router;
