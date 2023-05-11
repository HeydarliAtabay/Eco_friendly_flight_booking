import React, { useState } from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { DARK_GRAY, GRAY, GREEN } from "../../../helpers/styles";

export interface SingleQuestion {
    question: string
    answer: string
}

export default function Question(props: SingleQuestion) {
    const [open, setOpen] = useState(false)
    return (
        <View style={{ marginBottom: 5 }}>
            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', padding: 10, borderColor: GREEN, borderWidth: 1, borderRadius: 12 }}>
                <Text style={{ textAlign: 'left', fontSize: 18, width: '95%' }} >{props.question}</Text>
                <Icon name={!open ? 'chevron-down' : 'chevron-up'} size={20}
                    style={{ marginLeft: 'auto' }}
                    onPress={() => {
                        setOpen(!open)
                    }}
                />

            </View>

            {open &&
                <View style={{
                    display: 'flex', flexDirection: 'row', width: '95%', marginLeft: 'auto', marginRight: 'auto',
                    padding: 10, borderColor: DARK_GRAY, borderWidth: 1, borderBottomLeftRadius: 12, borderBottomRightRadius: 12
                }} >
                    <Text>
                        {props.answer}
                    </Text>
                </View>

            }
        </View>
    )
}