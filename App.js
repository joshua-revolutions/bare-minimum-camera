import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IosCamera } from './src/IosCamera';

export default function App() {
    return (
        <View style={styles.container}>

            <IosCamera />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
