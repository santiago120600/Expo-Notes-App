import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';

const NoteDetail = (props) =>{
    const {note} = props.route.params;
    const headerHeight = useHeaderHeight();
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
    return(
        <>
        <ScrollView contentContainerStyle={[styles.container, {paddingTop:headerHeight}]}>
            <Text style={styles.time}>{`Created At ${formatDate(note.time)}`}</Text>
            <Text style={styles.title}>{note.title}</Text>
            <Text style={styles.desc}>{note.desc}</Text>
        </ScrollView>

            <View style={styles.btnContainer}>
                <RoundIconBtn
                    antIconName='delete' 
                    onPress={()=>console.log('deleting note')}
                    style={{backgroundColor:colors.ERROR, color:'white', marginBottom:15}}/>
                <RoundIconBtn 
                    antIconName='edit' 
                    onPress={()=>console.log('edit note')}
                    style={{color:'white'}}/>
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
