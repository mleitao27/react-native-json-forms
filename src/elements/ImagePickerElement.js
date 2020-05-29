// Imports
import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  Dimensions
} from "react-native";

// Image Picker by  user built with react native TouchableOpacity and Image component
const ImagePickerElement = props => {

  // Variable used to update option's state
  let auxOptions = [];
  // State that stores the state of each option
  const [options, setOptions] = useState([]);
  // Dummy state used to force render
  const [dummyState, setDummyState] = useState(false);


  // Initially sets all options to false and sends an empty array as answer data
  useEffect(() => {
    for (var i = 0; i < props.items.length; i++)
      auxOptions[i] = false;
    // Send data through the onChange prop
    props.onChange(props.pageIndex, props.index, []);
    // Update options state
    setOptions(auxOptions);
  }, []);

  // Called everytime an image is pressed 
  const onChange = index => {

    // Array to save as answer data
    var data = [];

    // Fetch options from the state
    auxOptions = options;
    // Change pressed option
    auxOptions[index] = !auxOptions[index];

    // Adds true options (checked) to the answer array
    auxOptions.map((option, index) => {
      if (option) data.push(props.items[index].value);
    });

    // Saves new state
    setOptions(auxOptions);
    // Sends answer data to the form component (parent)
    props.onChange(props.pageIndex, props.index, data);
    // Forces render
    setDummyState(!dummyState);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.content} >
        {props.items.map((item, index) => {
          return (
            <View key={index}>
              <TouchableOpacity onPress={onChange.bind(this, index)}>
                <Image style={options[index] ? styles.imageSelect : styles.image} source={{ uri: item.imageLink }} />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

// Style
const styles = StyleSheet.create({
  container: {
    paddingBottom: Dimensions.get('window').height * 0.02
  },
  title: {
    fontSize: 18,
    marginBottom: Dimensions.get('window').height * 0.02
  },
  image: {
    width: Dimensions.get('window').width*0.15,
    height: Dimensions.get('window').width*0.15,
    margin: Dimensions.get('window').width*0.01,

  },
  imageSelect: {
    width: Dimensions.get('window').width*0.15,
    height: Dimensions.get('window').width*0.15,
    margin: Dimensions.get('window').width*0.01,
    borderColor: '#0FECCF',
    borderWidth: 4,
  },
  content: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  }
});

export default ImagePickerElement;
