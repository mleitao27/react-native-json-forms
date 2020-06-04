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

// Multiple Text Boxes inserted by user built with react native TextInput component
const MultipleTextElement = props => {

  // Variable used to update option's state
  let auxOptions = [];
  // State that stores the state of each option
  const [options, setOptions] = useState(() => {
    for (var i = 0; i < props.items.length; i++)
      auxOptions[i] = { name: props.items[i].name, value: "" };
    return auxOptions;
  });

  // Dummy state used to force render
  const [dummyState, setDummyState] = useState(false);


  // Initially sets all options to false and sends an empty array as answer data
  useEffect(() => {
    // Send data through the onChange prop
    props.onChange(props.pageIndex, props.index, []);
  }, []);

  // Called everytime user inserts text
  const onChange = (index, itemname, enteredText) => {

    // Fetch options from the state
    auxOptions = options;

    // Change text input item 
    auxOptions[index] = { name: itemname, value: enteredText };

    // Saves new state
    setOptions(auxOptions);

    // Sends answer data to the form component (parent)
    props.onChange(props.pageIndex, props.index, auxOptions);

    // Forces render
    setDummyState(!dummyState);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      {props.items.map((item, index) => {
        return (
          <View key={index} style={styles.content} >
            <Text style={styles.text}>{item.name}</Text>
            <TextInput
              style={styles.input}
              placeholder={"Type anything..."}
              multiline={false}      // Allows to wrap content in multiple lines 
              onChangeText={onChange.bind(this, index, item.name)}
              value={options[index].value}
              maxLength={40}    // Limit of characters, better solution then JS logic
            />
          </View>
        );
      })}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    paddingBottom: Dimensions.get('window').height * 0.02
  },
  title: {
    fontSize: 18,
    marginBottom: Dimensions.get("window").height * 0.02,
  },
  input: {
    backgroundColor: 'white',
    textAlignVertical: 'top',
    fontSize: 16,
    paddingVertical: Dimensions.get('window').height * 0.01,
    paddingHorizontal: Dimensions.get('window').width * 0.02,
    borderColor: Colors.secondary,
    borderWidth: 1
  },
  text: {
    fontSize: 16,
    marginBottom: Dimensions.get("window").height * 0.01
  },
  content: {
    paddingVertical: Dimensions.get('window').height * 0.01
  }
});


export default MultipleTextElement;