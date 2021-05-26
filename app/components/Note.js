import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import colors from '../misc/colors';

const Note = ({item}) =>{
    const {title,desc} = item;
    return(
        <View style={styles.container}>
            <Text style={styles.title} numberOfLines={2}>{title}</Text>
            <Text style={styles.desc} numberOfLines={3}>{desc}</Text>
        </View>
    )
}

const width = Dimensions.get('window').width-40;

const  styles = StyleSheet.create({
    container:{
        backgroundColor:colors.PRIMARY,
        width:width/2-10,
        padding:8,
        borderRadius:10,
    },
    title:{
        fontWeight:"bold",
        fontSize:16,
        color:colors.LIGHT,
    },
});

export default Note;
