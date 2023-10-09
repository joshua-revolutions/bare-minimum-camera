import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import React from "react";
import { TouchableOpacity } from "react-native";
import { colors } from '../constants/colors';

interface Props {
    onPress: () => void,
    icon: string,
    color?: string,
    size?: number
}
export const RIconButton = (props: Props) => {
    const color = props.color ? props.color : colors.themeDarkGrey
    const size = props.size ? props.size : 30
    return (
        <TouchableOpacity onPress={props.onPress}   >
            <Icon icon={props.icon} size={size} color={color} />
        </TouchableOpacity>
    )
}

