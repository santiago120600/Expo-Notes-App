import React, {useState, useEffect} from 'react';
import {TouchableWithoutFeedback, Keyboard, View, StyleSheet, TextInput, Modal, StatusBar, Text} from 'react-native';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';

const NoteInputModal = ({visible, onClose, onSubmit, note, isEdit}) =>{
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    useEffect(()=>{
        if(isEdit){
            setTitle(note.title);
            setDesc(note.desc);
        }
    },[isEdit]);

    const handleModalClose = () =>{
        Keyboard.dismiss();
    };

    const handleOnChangeText = (text, valueFor) => {
        if(valueFor === 'title') setTitle(text);
        if(valueFor === 'desc') setDesc(text);
    }

    const handleSubmit = () =>{
        if(!title.trim() && !desc.trim()) return onClose();
        if(isEdit){
            onSubmit(title,desc,Date.now());
        }else{
            onSubmit(title, desc);
            setTitle('');
            setDesc('');
        }
        onClose();
    }

    const closeModal = () =>{
        if(!isEdit){
            setTitle('');
            setDesc('');
        }
        onClose();
    }

    return(
        <>
            <StatusBar hidden/>
            <Modal visible={visible} animationType='fade'>
                <View style={styles.container}>
                    <TextInput 
                        onChangeText={(text)=>handleOnChangeText(text,'title')}
                        value={title}
                        placeholder='title' 
                        style={[styles.input, styles.title]}/>
                    <TextInput 
                        value={desc}    
                        onChangeText={(text)=>handleOnChangeText(text,'desc')}
                        multiline 
                        placeholder='Note' 
                        style={[styles.input, styles.desc]}/>
                    <View style={styles.btnContainer}>
                        <RoundIconBtn 
                            antIconName='check' 
                            size={15}    
                            onPress={handleSubmit}    
                            />
                        {
                            title.trim() || desc.trim() ? 
                            (
                        <RoundIconBtn 
                            antIconName='close' 
                            size={15}    
                            style={{marginLeft:15}}
                            onPress={closeModal}    
                                />    
                            ) : null 
                        }
                    </View>
                </View>
            <TouchableWithoutFeedback onPress={handleModalClose}>
                <View style={[styles.modalBG, StyleSheet.absoluteFillObject]}/>
            </TouchableWithoutFeedback>
            </Modal>
        </>
    )
}

const  styles = StyleSheet.create({
    title:{
        height:40,
        marginBottom:15,
        fontWeight:'bold',
    },
    input:{
        borderBottomWidth:2,
        borderBottomColor:colors.PRIMARY,
        fontSize:20,
        color:colors.DARK,
    },
    desc:{
        height:100,
    },
    container:{
        paddingHorizontal:20,
        paddingTop:15,
    },
    modalBG:{
        flex:1,
        zIndex:-1,
    },
    btnContainer:{
        flexDirection:'row',
        justifyContent:'center',
        paddingVertical:15,
    },
});

export default NoteInputModal;
