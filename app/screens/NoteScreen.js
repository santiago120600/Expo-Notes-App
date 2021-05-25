import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, StatusBar} from 'react-native';
import colors from '../misc/colors';
import SearchBar from '../components/SearchBar';
import RoundIconBtn from '../components/RoundIconBtn';
import NoteInputModal from '../components/NoteInputModal';

const NoteScreen = ({user}) =>{
    const [greet, setGreet] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const handleOnSubmit = (title, desc) =>{
        console.log(title, desc);
    }
    
    const findGreet = () =>{
        const hrs = new Date().getHours();
        if(hrs === 0 || hrs < 12) return setGreet('Morning');
        if(hrs === 1 || hrs < 17) return setGreet('Afternoon');
        setGreet('Evening');
    };

    useEffect(() => {
        findGreet();
    },[]);

    return(
        <>
            <StatusBar barStyle='dark-content' backgroundColor={colors.LIGHT}/>
            <View style={styles.container}>
                <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>
                <SearchBar containerStyle={{marginVertical:15}}/>
                <View style={[StyleSheet.absoluteFillObject,styles.emptyHeaderContainer]}>
                    <Text style={styles.emptyHeader}>Add Notes</Text>
                    <RoundIconBtn 
                        onPress={()=>setModalVisible(true)} 
                        antIconName='plus' 
                        style={styles.addBtn}
                        />    
                </View>
            </View>
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
