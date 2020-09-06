// Imports
import React, { useState, useEffect } from 'react';
import {
  TextInput, 
  View, 
  Text, 
  StyleSheet,
  Dimensions
} from "react-native";

import Colors from "../constants/colors";
import Styles from '../constants/styles';

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Text inserted by user built with react native TextInput component
const TextElement = props => {

  // State that stores input text
  const [value, setValue] = useState('');

  // On first render send default value in answer data in the form component
  useEffect(() => {
    // Send data through the onChange prop
    props.onChange(props.pageIndex, props.index, '');
  }, []);

  // When text is inserted, state is changed and it updates answer data
  const inputHandler = enteredValue => {
    setValue(enteredValue);
    props.onChange(props.pageIndex, props.index, enteredValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <TextInput
        style={styles.input}
        placeholder={"Type anything..."}
        multiline={false}      // Allows to wrap content in multiple lines
        onChangeText={inputHandler}
        value={value}
        maxLength={40}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    paddingBottom: windowHeight * 0.02
  },
  title: {
    fontSize: 18,
    marginBottom: windowHeight * 0.02,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: 'white',
    textAlignVertical: 'center',
    fontSize: 16,
    paddingVertical: windowHeight * 0.01,
    paddingHorizontal: windowWidth * 0.02,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: (windowHeight+windowWidth) * 0.01,
    ...Styles.shadow
  },
});

export default TextElement;