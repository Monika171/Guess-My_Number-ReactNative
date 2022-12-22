import {useState} from 'react'
import { TextInput, View, StyleSheet, Alert, Text, useWindowDimensions, KeyboardAvoidingView, ScrollView } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../constants/colors";
import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';

function StartGameScreen({onPickNumber}) {
  const [enteredNumber, setEnteredNumber] = useState('');

  const {width, height} = useWindowDimensions();

  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText);
  }

  function resetInputHandler() {
    setEnteredNumber('');
  }

  function confirmInputHandler(){
    const chosenNumber = parseInt(enteredNumber);
    if(isNaN(chosenNumber) || chosenNumber <=0 || chosenNumber > 99) {
      Alert.alert('Invalid Number', 'Number has to be in between 1 and 99', [{text: 'Okay', style: 'destructive', onPress: resetInputHandler }]);
      return;
    }

    onPickNumber(chosenNumber);

  }

  // console.log('height'+height)
  const marginTopDistance =  height < 397 ? 70 : 170;

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView  style={styles.screen} behavior="position">
      <View style = {[styles.rootContainer, {marginTop: marginTopDistance}]}>
    <Title>Guess My Number</Title>
    <Card>
      <InstructionText style={styles.startScreenTitle}>Enter a Number and I will Guess..</InstructionText>
    <TextInput 
    style={styles.numberInput} 
    maxLength={2} 
    keyboardType="number-pad" 
    autoCapitalize="none" 
    autoCorrect={false}
    onChangeText={numberInputHandler}
    value = {enteredNumber}
    />
    <View style={styles.buttonsContainer}>
    <View style={styles.buttonContainer}>
      <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
      </View>
    <View style={styles.buttonContainer}>
      <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
      </View>
    </View>
  </Card>
  </View>
    </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default StartGameScreen;

// const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  rootContainer: {
    flex: 1,
    // marginTop:  deviceHeight < 380 ? 30 : 80,
    alignItems: 'center'
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 1
  },
  startScreenTitle: {
    fontSize: 21
  }
})
