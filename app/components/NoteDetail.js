import React, {useContext, useState} from 'react';
import {View, Alert, StyleSheet, Text, ScrollView} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';
import { AsyncStorage } from 'react-native';
import {useNotes} from '../context/NoteProvider';
import NoteInputModal from './NoteInputModal';

const NoteDetail = (props) =>{
    const [note,setNote] = useState(props.route.params.note);
    const headerHeight = useHeaderHeight();
    const {setNotes} =useNotes();
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const formatDate = (ms) =>{
        const date = new Date(ms);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hrs = date.getHours();
        const min = date.getMinutes();
        const sec = date.getSeconds();
        return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
    }

    const deleteNote = async () =>{
        try{
            const result = await AsyncStorage.getItem('notes');
            let notes = [];
            if(result !== null) {
                notes = JSON.parse(result);
                const newNotes = notes.filter(n => n.id !== note.id);
                setNotes(newNotes);
                await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
            }
            props.navigation.goBack();    
        }catch(e){
            console.log("Error deleting note",e);
            throw Error(e);
        }
    }

    const displayDeleteAlert = () =>{
        Alert.alert('Are you sure!','This actions will delete your note permanently!',
        [
            {
                text:'Delete',
                onPress: deleteNote
            },
            {
                text:'No thanks',
                onPress: ()=>console.log('No thanks')
            }
        ],{
            cancelable:true,
        });
    }

    const handleUpdate = async (title,desc,time)=>{
        try{
            const result = await AsyncStorage.getItem('notes');
            let notes = [];
            if(result !== null){
                notes = JSON.parse(result);
            }
            const newNotes = notes.filter(n=>{
                if(n.id===note.id){
                    n.title = title;
                    n.desc = desc;
                    n.isUpdated = true;
                    n.time = time;

                    setNote(n);
                }
                return n;
            });
            setNotes(newNotes);
            await AsyncStorage.setItem('notes',JSON.stringify(newNotes));
        }catch(e){
            console.log("Error updating note",e);
            throw Error(e);
        }
    }

    const handleOnClose = () =>{setShowModal(false)}
    const openEditModal =()=>{
        setIsEdit(true);
        setShowModal(true);
    }

    return(
        <>
        <ScrollView contentContainerStyle={[styles.container, {paddingTop:headerHeight}]}>
            <Text style={styles.time}>{note.isUpdated ? `Updated At ${formatDate(note.time)}`:  `Created At ${formatDate(note.time)}`}</Text>
            <Text style={styles.title}>{note.title}</Text>
            <Text style={styles.desc}>{note.desc}</Text>
        </ScrollView>

            <View style={styles.btnContainer}>
                <RoundIconBtn
                    antIconName='delete' 
                    onPress={displayDeleteAlert}
                    style={{backgroundColor:colors.ERROR, color:'white', marginBottom:15}}/>
                <RoundIconBtn 
                    antIconName='edit' 
                    onPress={openEditModal}
                    style={{color:'white'}}/>
                <NoteInputModal
                   note={note} 
                   isEdit={isEdit} 
                   onClose={handleOnClose} 
                   onSubmit={handleUpdate} 
                   visible={showModal}
                />
            </View>
        </>
    )
}

const  styles = StyleSheet.create({
    container:{
        //flex:1,
        paddingHorizontal:15,
    },
    title:{
        fontSize:30,
        color:colors.PRIMARY,
        fontWeight:'bold',
    },
    desc:{
        fontSize:20,
        opacity:0.6,
    },
    time:{
        textAlign:'right',
        fontSize:12,
        opacity:0.5,
    },
    btnContainer:{
        position:'absolute',
        right:15,
        bottom:50,
    },
});

export default NoteDetail;
