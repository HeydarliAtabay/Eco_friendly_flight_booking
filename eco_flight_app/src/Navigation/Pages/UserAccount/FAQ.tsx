import React, { useState } from "react";
import { Text, StyleSheet, View, FlatList, SafeAreaView, ScrollView } from "react-native";
import { Button, Card, TextInput } from "react-native-paper";
import { DARK_GRAY, GREEN } from "../../../helpers/styles";
import Question, { SingleQuestion } from "./Question";

const questions: SingleQuestion[] = [{
    question: 'Are all of the flights that we see in the application Eco-friendly?',
    answer: 'Yes, this platform selects flights ONLY from eco-friendly airlines'
},
{
    question: 'How will I get my boarding pass?',
    answer: 'Our application provides, online Check-in process. So you will have your electronic Boarding pass, directly from application.'
},
{
    question: 'Are my payment details secure?',
    answer: 'Yes, all necessary data is encrypted in our application, so no need to worry about security'
},
{
    question: 'Can I select seats for a flight later?',
    answer: 'Of course, you can either select seat during the flight booking, or later during the checkin process'
},
{
    question: 'Is there any other payment methods rather than credit/debit card?',
    answer: 'There is a possibility for paying with PayPal.'
},

]

export default function FAQ(props: { closeFunc: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [openEmail, setOpenEmail] = useState(false)
    return (
        <View style={styles.container}>

            <Card style={styles.card}>
                <ScrollView style={{ height: '100%' }}>
                    <Card.Content style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 2 }} >
                        <Text style={{ textAlign: 'center', fontSize: 18, marginBottom: 10 }} >Most frequent questions</Text>

                        <View style={{
                            height: '100%', padding: 10,

                        }}>
                            {questions.map((quest, index) => {
                                return (
                                    <Question key={index} question={quest.question} answer={quest.answer} />
                                )
                            })

                            }
                            <View style={{ display: 'flex', flexDirection: 'column' }}>
                                <Text style={{ textAlign: 'left', fontSize: 16 }}>Did you find an answer to your question?</Text>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Button textColor='green' onPress={() => { props.closeFunc(false) }}>Yes</Button>
                                    <Button textColor="red" onPress={() => {
                                        setOpenEmail(true)
                                    }}>No</Button>
                                </View>
                                {openEmail &&
                                    <View style={{ display: 'flex', flexDirection: 'column' }}>
                                        <TextInput style={{
                                            borderColor: DARK_GRAY, borderRadius: 12, borderWidth: 1, height: 80,
                                            backgroundColor: '#fff', fontSize: 12
                                        }}
                                            placeholder='Send us an email'
                                        >

                                        </TextInput>
                                        <Button mode='contained' buttonColor={GREEN} color='white'
                                            style={{ width: '50%', marginLeft: 'auto', marginTop: 5 }}
                                            onPress={() => props.closeFunc(false)}
                                        >
                                            Send email
                                        </Button>
                                    </View>
                                }
                            </View>
                        </View>

                    </Card.Content>
                </ScrollView>
            </Card>
        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: '90%',
        padding: 0,
        marginBottom: 10,
        backgroundColor: '#fff',
        height: '90%',
        borderColor: GREEN,
        borderWidth: 1
    },
    header: {
        height: 60,
        backgroundColor: '#ededed',
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        marginTop: 45
    },
    title: {
        fontSize: 20,
        marginLeft: 30,
    },
});