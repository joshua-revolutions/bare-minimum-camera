import { Camera, CameraType } from "expo-camera";
import React, { useEffect, useRef } from "react";
import { StyleSheet } from 'react-native';

export const CameraSettings = () => {
    const cameraRef = useRef(null);
    const [status, requestPermission] = Camera.useCameraPermissions();
    useEffect(() => {
        console.log("status", status)
        if (status?.granted) {
            const setup = async () => {

                const sizes = await cameraRef.current.getAvailablePictureSizesAsync();
                console.log("cameraSizes", sizes);
            }
            setup();
        }
    }, [status?.granted])

    return (
        <React.Fragment>
            <Camera style={styles.camera} type={CameraType.back} useCamera2Api ref={cameraRef}>
            </Camera>

        </React.Fragment>

    )
}

const styles = StyleSheet.create({
    camera: {
        height: 0,
        width: 0
    }
})