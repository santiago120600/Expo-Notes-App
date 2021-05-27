import React, {useEffect, useState} from 'react';
import {View, FlatList, Keyboard, StyleSheet, Text, StatusBar, TouchableWithoutFeedback} from 'react-native';
import colors from '../misc/colors';
import SearchBar from '../components/SearchBar';
import RoundIconBtn from '../components/RoundIconBtn';
import NoteInputModal from '../components/NoteInputModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from '../components/Note';

const NoteScreen = ({user, navigation}) =>{
    const [greet, setGreet] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [notes, setNotes] = useState([]);

    const handleOnSubmit = async (title, desc) =>{
        const note = {id:Date.now(),title,desc,time:Date.now()};
        const updatedNotes = [...notes,note];
        setNotes(updatedNotes);
        try{
            await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
        }catch(e){
            console.log("Error setting notes",e);
            throw Error(e);
        }
    }

    const findGreet = () =>{
        const hrs = new Date().getHours();
        if(hrs === 0 || hrs < 12) return setGreet('Morning');
        if(hrs === 1 || hrs < 17) return setGreet('Afternoon');
        setGreet('Evening');
    };

    const findNotes = async () =>{
        try {
            const result = await AsyncStorage.getItem('notes')
            console.log(result);
            if(result !== null) {
                setNotes(JSON.parse(result));
            }
          } catch(e) {
            console.log("Error getting notes",e);
            throw Error(e);
          }
    }

    useEffect(() => {
        findNotes();
        findGreet();
    },[]);

    const openNote = (note) =>{
        navigation.navigate('NoteDetail',{note});
    }

    return(
        <>
            <StatusBar barStyle='dark-content' backgroundColor={colors.LIGHT}/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>
                    {notes.length ? 
                        <SearchBar containerStyle={{marginVertical:15}}/>
                        : null
                    }
                    <FlatList
                        columnWrapperStyle={{
                            justifyContent:'space-between',
                            marginBottom:15,    
                        }}
                        numColumns={2}
                        data={notes}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({item})=><Note onPress={()=>openNote(item)} item={item}/>}
                    />
                    {!notes.length ? (
                        <View style={[StyleSheet.absoluteFillObject,styles.emptyHeaderContainer]}>
                            <Text style={styles.emptyHeader}>Add Notes</Text>
                        </View>) : null
                    }
                </View>
            </TouchableWithoutFeedback>
            <RoundIconBtn 
                onPress={()=>setModalVisible(true)} 
                antIconName='plus' 
                style={styles.addBtn}
                />    
            <NoteInputModal
                visible={modalVisible}
                onClose={()=>setModalVisible(false)}
                onSubmit={handleOnSubmit}
                />
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:20,
        flex:1,
        zIndex:1,
    },
    header:{
        fontSize:25,
        fontWeight:'bold',
    },
    emptyHeader:{
        fontSize:30,
        textTransform:'uppercase',
        fontWeight:'bold',
        opacity:0.2,
    },
    emptyHeaderContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        zIndex:-1,
    },
    addBtn:{
        position:'absolute',
        right:15,
        bottom:50,
    },
});


export default NoteScreen;
