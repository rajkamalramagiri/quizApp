import React from 'react';

import { View, Text, TouchableOpacity, Image , StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    imgContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        
flex:1,
        
    },
    
    container: {
        height: '100%',
        padding: 20,
        backgroundColor:'#ffffff'
        
    },
    logo: {
        width: 400,
        height: 300,
    
   
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight:'bold'
    },
    button: {
        backgroundColor: '#39CCCC',
        padding: 20,
        borderRadius: 20,
        width: '100%',
        alignItems: 'center',
        marginBottom: 30,
        
    }
  });

  
function Home({navigation}) {
    return (
        <View style={styles.container}>

        <View style={styles.imgContainer}>
            <Image
        style={styles.logo}
        source={{
            uri: 'https://blogs.biomedcentral.com/on-medicine/wp-content/uploads/sites/6/2015/11/Fotolia_58544890_Quiz_Question_Marks3-2.jpg',
        }}
                />
        </View>
                
            <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate('Quiz')}
            >
                <Text style={styles.buttonText}>


                START
                </Text>
            </TouchableOpacity>

        </View>
    )
}

export default Home;
