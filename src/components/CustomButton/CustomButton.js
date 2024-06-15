import React from 'react';
import {Text, View,StyleSheet, Pressable} from 'react-native';

const CustomButton = ({ text,onPress }) => {
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#3b5998',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    container_SECONDARY: {
        borderColor: '#3B71F3',
        borderWidth: 2,
      },
});
export default CustomButton;
