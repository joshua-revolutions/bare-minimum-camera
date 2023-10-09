import React, { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
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
    const windowDimensions = useWindowDimensions();
    const [previewWidth, setPreviewWidth] = useState(null);
    const [previewHeight, setPreviewHeight] = useState(null);
    const [cameraLayout, setCameraLayout] = useState<CameraLayout>(CameraLayout.Unknown);



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
