import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Camera, useCameraDevice, useCameraFormat, useCameraPermission } from 'react-native-vision-camera';
import { CameraBottomSection } from '../CameraBottomSection';
import { measurementConstants } from '../constants/measurementConstants';
import { imageUtil } from '../util/imageUtil';

interface Props {
    previewWidth: number,
    previewHeight: number,
    onSavePhoto: (filePath: string, base64: string) => void
}

export const CameraModalBodyTablet = (props: Props) => {
    const device = useCameraDevice('back')
    const format = useCameraFormat(device, [
        { videoResolution: 'max' },
        { photoResolution: 'max' }
    ])
    const { hasPermission, requestPermission } = useCameraPermission()

    const cameraRef = useRef(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [blackHeight, setBlackHeight] = useState(0);
    const [isBusy, setIsBusy] = useState(false);

    useEffect(() => {


    }, []);


    const pickPhoto = async () => {
        setIsProcessing(true);


    }

    if (device === null) {
        return null;
    }
    if (!hasPermission) {
        return <Text>No access to camera</Text>;
    }
    if (isProcessing) {
        return (
            <View style={styles.waitContainer}>
                <Text>
                    Loading image...
                </Text>

            </View>
        )
    }

    const containerStyle = {
        width: props.previewWidth,
        height: props.previewHeight
    }

    const onLayout = (event) => {
        var { x, y, width, height } = event.nativeEvent.layout;
        setBlackHeight(height);
    }

    const takePhoto = async () => {
        console.log('takePhoto')
        const photo = await cameraRef.current.takePhoto()
        const path = photo.path;
        const base64 = await imageUtil.toBase64Compressed(path);
        console.log(base64)
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={containerStyle}>
                    <Camera
                        ref={cameraRef}
                        style={StyleSheet.absoluteFill}
                        device={device}
                        isActive={true}
                        format={format}
                        photo={true}
                    />
                </View>
            </View>

            <View style={styles.black} onLayout={onLayout}>
                <CameraBottomSection label="Take Photo"
                    onPressCamera={takePhoto} onPressPickPhoto={pickPhoto}
                    blackHeight={blackHeight}
                    isBusy={isBusy} />

            </View>




        </View>

    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    waitContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    black: {
        height: measurementConstants.cameraBlackBottom,
        bottom: 0, left: 0, right: 0,
        backgroundColor: 'black',
        justifyContent: 'space-evenly',
        alignItems: 'center',

    },
    camera: {
        flex: 1,
    },
    takePhotoButtonContainer: {
        position: 'absolute',
        bottom: 50,
        right: 0,
        left: 0,
        height: 200,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    checkboxContainer: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonBorder: {
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 50,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pickContainer: {
        position: 'absolute',
        bottom: 0,
        left: 10,
        height: 60,
        justifyContent: 'center',
    },
});

