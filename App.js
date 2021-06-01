import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Intro from './app/screens/Intro';
import { AsyncStorage } from 'react-native';
import NoteScreen from './app/screens/NoteScreen';
import { createStackNavigator } from '@react-navigation/stack';
import NoteDetail from './app/components/NoteDetail';
import { NavigationContainer } from '@react-navigation/native';
import NoteProvider from './app/context/NoteProvider';

const Stack = createStackNavigator();

export default function App() {
    const [user,setUser] = useState({});
    const [isAppFirstTimeOpen, setIsAppFirstTimeOpen] = useState(false);
    const findUser = async () =>{
        const result = await AsyncStorage.getItem('user');
        if(result !== null){
            setUser(JSON.parse(result));
            setIsAppFirstTimeOpen(false);
        }else{
            return setIsAppFirstTimeOpen(true);
        }
    }

    useEffect(()=>{
        findUser();
        //AsyncStorage.clear();
    },[]);

    const renderNoteScreen = props => <NoteScreen {...props} user={user}/>
    
    if(isAppFirstTimeOpen) return <Intro onFinish={findUser}/>;
    return( 
        <NavigationContainer>
            <NoteProvider>
                <Stack.Navigator
                    screenOptions={{headerTitle:'',headerTransparent:true}}
                >
                  <Stack.Screen name="NoteScreen" component={renderNoteScreen} />
                  <Stack.Screen name="NoteDetail" component={NoteDetail} />
                </Stack.Navigator>
            </NoteProvider>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
