import * as FileSystem from 'expo-file-system';
import { EncodingType } from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import { SaveFormat } from 'expo-image-manipulator';


const DEFAULT_COMPRESSION = 0.5;

/**
 * 
 * @param filePath This doesn't seem to work with files in the camera roll
 * @returns base 64 string; includes data:image/xxx;base64 at the start
 */
async function toBase64(filePath: string, omitPrefix?: boolean) {
    try {
        const options = {
            encoding: EncodingType.Base64
        }
        const result = await FileSystem.readAsStringAsync(filePath, options)
        const startIndex = 0;
        const length = 4;
        if (omitPrefix) {
            return result;
        }
        else if (result.substring(startIndex, startIndex + length) === '/9j/') {
            return "data:image/jpeg;base64, " + result;
        } else {
            return "data:image/png;base64, " + result;

        }


    } catch (err) {
        console.error(err);
        return null;
    }
}


function fixImageForSketchCanvas(filePath: string) {
    const regex = /file:\/*/
    const fixedPath = filePath.replace(regex, "");
    return fixedPath;
}


async function toBase64Compressed(filePath: string, omitPrefix?: boolean) {
    try {
        const compress = 1
        const actions = [];
        const saveOptions = {
            base64: true,
            compress: compress,
            format: SaveFormat.JPEG
        }
        const imageResult = await ImageManipulator.manipulateAsync(filePath, actions, saveOptions);
        const base64 = imageResult.base64;
        const startIndex = 0;
        const length = 4;
        if (omitPrefix) {
            return base64;
        }
        else if (base64.substring(startIndex, startIndex + length) === '/9j/') {
            return "data:image/jpeg;base64," + base64;
        } else {
            return "data:image/png;base64," + base64;

        }


    } catch (err) {
        console.error(err);
        return null;
    }
}

/**
 * There is a bug with newer version of react native that doesn't handle spaces
 * https://github.com/facebook/react-native/issues/36512
 */
function fixBase64ForImageComponent(base64: string) {
    return base64.replace(/(\r\n|\n|\r|\s)/gm, '')
}

export const imageUtil = {
    toBase64: toBase64,
    fixImageForSketchCanvas: fixImageForSketchCanvas,
    toBase64Compressed: toBase64Compressed,
    fixBase64ForImageComponent: fixBase64ForImageComponent
}