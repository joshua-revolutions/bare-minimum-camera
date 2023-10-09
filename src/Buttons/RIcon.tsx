
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import React from "react";
import { View } from "react-native";
import { colors } from "../constants/colors";
import { fontSizes } from "../constants/fontSizes";

interface Props {
    /**
    * Icons: https://materialdesignicons.com/
    */
    icon: string,
    style?: any,
    size?: number,
    color?: string

}
export const RIcon = (props: Props) => {
    const size = props.size ? props.size : fontSizes.buttonIcon
    const color = props.color ? props.color : colors.themeLightGrey
    const containerStyle = [props.style]

    return (
        <View style={containerStyle}>
            <Icon icon={props.icon} size={size} color={color} />

        </View>

    )
}
