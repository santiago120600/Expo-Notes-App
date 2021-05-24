import React, {useState} from 'react';
import {View, Dimensions, StatusBar, StyleSheet, TextInput, Text} from 'react-native';
import colors from '../misc/colors';
import RoundIconBtn from '../components/RoundIconBtn';
import { AsyncStorage } from 'react-native';

const Intro = () =>{
    const [name, setName] = useState('');

    const handleOnChangeText = text =>{
        setName(text);
    };

    const handleSubmit = async () =>{
        const user = {name:name};
        try{
            await AsyncStorage.setItem('user', JSON.stringify(user));
        }catch(e){
            console.log(e);
        }
    };

    return (
        <>
            <StatusBar hidden/>
            <View style={styles.container}>
                <Text style={styles.inputTitle}>Enter your name to continue</Text>
                <TextInput
                    value={name} 
                    onChangeText={handleOnChangeText} 
                    placeholder="Enter Name" 
                    style={styles.textInput}
                />
        {name.trim().length >= 3 ? (<RoundIconBtn antIconName='arrowright' onPress={handleSubmit}/>) : null}
            </View>
        </>
    );
};

const width = Dimensions.get('window').width - 50;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    textInput:{
        borderWidth:2,
        borderColor:colors.PRIMARY,
        color:colors.PRIMARY,
        width,
        height:50,
        borderRadius:10,
        fontSize:25,
        marginBottom:15,
    },
    inputTitle:{
        alignSelf:'flex-start',
        paddingLeft:25,
        marginBottom:5,
        opacity:0.5,
    },
});

export default Intro;
