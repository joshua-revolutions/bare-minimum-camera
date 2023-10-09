
import { StyleSheet, View } from 'react-native';
import { RIconButton } from './Buttons/RIconButton';
import { CameraButton } from './CameraButton';
import { RText } from './Typography/RText';
import { colors } from './constants/colors';

interface Props {
    label: string,
    onPressCamera: () => void,
    onPressPickPhoto: () => void,
    blackHeight: number,
    isBusy?: boolean
}

const HEIGHT = 120;

export const CameraBottomSection = (props: Props) => {
    const containerStyle = styles.bottomFixed
    return (

        <View style={containerStyle}>
            <CameraButton onTakePhoto={props.onPressCamera} isBusy={props.isBusy} />
            <RText color='white'>{props.label}</RText>
            <View style={styles.pickContainer}>
                <RIconButton onPress={props.onPressPickPhoto} icon="camera-burst" />
            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    bottomFixed: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: HEIGHT,
    },
    waitContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    black: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
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
    textBorder: {
        backgroundColor: colors.cameraLabel,
        paddingHorizontal: 6,
        borderRadius: 4,
        alignItems: 'flex-end',
    },
    pickContainer: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        height: HEIGHT,
        justifyContent: 'flex-end',
    },
});

