import React, { useEffect, useState } from 'react'

import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        height: '100%',
        padding: 20,
    },
    question: {
        color: '#000000',
        fontSize: 25,
        fontWeight: '500',
        marginVertical:20
    },
    optionContainer: {
        backgroundColor: '#39CCCC',
        padding: 20,
        borderRadius: 20,
        width: '80%',
        alignItems: 'center',
        marginBottom: 30,
        alignItems: 'center'
    },
    option: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    flex: {
        alignItems: 'center',
        marginVertical: 30,
        flex: 1
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonBottomContainer: {
        backgroundColor: '#39CCCC',
        padding: 20,
        borderRadius: 20,
        width: '40%',
        alignItems: 'center',
        marginBottom: 30,
        alignItems: 'center'
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight:'bold'
    },
    button: {
        backgroundColor: '#39CCCC',
        padding: 20,
        borderRadius: 20,
        width: '100%',
        alignItems: 'center',
        marginBottom: 30,
        
    },
    scoreContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex:1

    }
});


function Quiz() {
    const [questions, setQuestions] = useState();
    const [qno, setQno] = useState(0);
    const [score, setScore] = useState(0)
    const[replay,setReplay]=useState(true)

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    const getQuiz = async () => {
        const url = 'https://opentdb.com/api.php?amount=10&type=multiple';
        const res = await fetch(url);
        const data = await res.json();
        data.results.map(q => {
            let options = [];
            options.push(...q.incorrect_answers, q.correct_answer)
            shuffle(options);
            q.options = options
        })
        setQuestions(data.results)
    }

    const handleReplay = () => {
        setReplay(!replay)
        setScore(0)
        setQno(0)
        setQuestions(null)
    }

    const handlePress = (op, ca) => {
        if (op === ca) {
            setScore(score + 1)
        }

        if (questions.length > qno) {
            setQno(qno + 1)
        }
    }

    useEffect(() => {
        getQuiz()
    }, [replay])
    return (
        <View style={styles.container}>
            {questions ? (questions.length > qno ? (<>
                <Text style={styles.question}>
                    {`Q.${qno + 1} ${questions[qno].question}`}
                </Text>
                <View style={styles.flex}>
                    {questions[qno].options.map((op, i) => (<TouchableOpacity key={i} style={styles.optionContainer}

                        onPress={() => handlePress(op, questions[qno].correct_answer)


                        }
                    >
                        <Text style={styles.option}>
                            {op}
                        </Text>
                    </TouchableOpacity>))}

                </View>
            </>) : (<View style={styles.scoreContainer}>
                <Text style={styles.question}>
                  Congratz
                </Text>
                <Text style={styles.question}>
                    {`You scored : ${score}/${questions.length}`}
                </Text>
                <TouchableOpacity style={styles.button}
                    onPress={handleReplay}
                >
                    <Text style={styles.buttonText}>
                        Play Again
                    </Text>
                </TouchableOpacity>
            </View>
            )) : (<View>

                <Text style={styles.question}>Loading...</Text>
            </View>)}

        </View>
    )
}

export default Quiz;