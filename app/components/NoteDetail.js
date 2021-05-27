import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';

const NoteDetail = (props) =>{
    const {note} = props.route.params;
    const headerHeight = useHeaderHeight();
    return(
        <View style={[styles.container, {paddingTop:headerHeight}]}>
            <Text>{note.title}</Text>
        
            <Text>{note.desc}</Text>
        </View>
    )
}

const  styles = StyleSheet.create({
    container:{
    },
});

export default NoteDetail;
