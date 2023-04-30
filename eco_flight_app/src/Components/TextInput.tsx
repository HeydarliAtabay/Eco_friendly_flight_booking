import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'

interface textInputInterface {
    errorText: string
    description: string
}



export default function TextInputCustom(props: textInputInterface) {
    return (
        <View style={styles.container}>
            <Input
                style={styles.input}

                underlineColor="transparent"
                mode="outlined"
                {...props}
            />
            {props.description && !props.errorText ? (
                <Text style={styles.description}>{props.description}</Text>
            ) : null}
            {props.errorText ? <Text style={styles.error}>{props.errorText}</Text> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 12,
    },
    input: {
        backgroundColor: 'white',
    },
    description: {
        fontSize: 13,
        color: '#ADD8E6',
        paddingTop: 8,
    },
    error: {
        fontSize: 13,
        color: 'red',
        paddingTop: 8,
    },
})