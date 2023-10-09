import React, { useRef } from "react";
import { ActivityIndicator, Platform, StyleSheet, TouchableOpacity } from "react-native";
import { RIcon } from "./Buttons/RIcon";

interface Props {
    onTakePhoto: () => void,
    isBusy?: boolean
}

function getInitialState() {
    return {
        debouncing: false
    }
}

export const CameraButton = (props: Props) => {
    const stateRef = useRef(getInitialState())

    const onPress = () => {
        if (stateRef.current.debouncing) {
            return;
        }

        stateRef.current.debouncing = true;
        setTimeout(() => {
            stateRef.current.debouncing = false;
        }, 1000)
        if (Platform.OS === 'android') {
            // soundUtil.playShutter();
        }
        props.onTakePhoto();
    }

    const renderContent = () => {
        if (props.isBusy) {
            return <ActivityIndicator animating color='white' />

        }
        return <RIcon size={40} icon="camera" color='white' />
    }

    return (
        <TouchableOpacity style={styles.buttonBorder} onPress={onPress} disabled={props.isBusy}>
            {renderContent()}
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({


    buttonBorder: {
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 50,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4
    }
})