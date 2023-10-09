import { Camera } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import { Text, useWindowDimensions } from 'react-native';
import { measurementConstants } from '../constants/measurementConstants';
import { CameraModalBodyTablet } from './CameraModalBodyTablet';


enum CameraLayout {
    Unknown,
    Phone,
    Tablet
}

interface Props {

}

export const IosCamera = (props: Props) => {
    const [hasPermission, setHasPermission] = useState(null);
    const windowDimensions = useWindowDimensions();
    const [previewWidth, setPreviewWidth] = useState(null);
    const [previewHeight, setPreviewHeight] = useState(null);
    const [cameraLayout, setCameraLayout] = useState<CameraLayout>(CameraLayout.Unknown);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();


    }, []);

    useEffect(() => {
        const previewHeight = windowDimensions.width * 4 / 3;
        const previewWidth = windowDimensions.width
        setPreviewWidth(previewWidth)
        setPreviewHeight(previewHeight)
        if (previewHeight > windowDimensions.height - measurementConstants.cameraBlackBottom * 2) {
            setCameraLayout(CameraLayout.Tablet)
        } else {
            setCameraLayout(CameraLayout.Phone)

        }
    }, [windowDimensions])

    if (hasPermission === null) {
        return <Text>No access to camera</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    if (!previewHeight || !previewWidth) {
        return null;
    }
    if (cameraLayout === CameraLayout.Unknown) {
        return (
            null
        )
    }

    const onSavePhoto = () => {

    }


    return <CameraModalBodyTablet previewHeight={previewHeight}
        previewWidth={previewWidth}
        onSavePhoto={onSavePhoto} />


}
