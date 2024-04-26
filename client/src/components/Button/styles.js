import { StyleSheet } from "react-native";

export const getStyles = (props) => StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 8,
        justifyContent: 'center',
        backgroundColor: props.colors.primary
    },
    text: {
        textAlign: 'center',
        color: props.colors.text
    },
    buttonContainer: {
        gap: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }
})