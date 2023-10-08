import { Camera, CameraType } from "expo-camera";
import React, { useEffect, useRef } from "react";
import { StyleSheet } from 'react-native';

export const CameraSettings = () => {
    const cameraRef = useRef(null);
    const [status, requestPermission] = Camera.useCameraPermissions();
    useEffect(() => {
        console.log(status)
    }, [status])
    useEffect(() => {
        const setup = async () => {

            const sizes = await cameraRef.current.getAvailablePictureSizesAsync("4:3");
            console.log("cameraSizes", sizes);
        }
        setup();
    }, [cameraRef.current])

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