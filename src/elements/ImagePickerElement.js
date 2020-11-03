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

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;

// Image Picker by  user built with react native TouchableOpacity and Image component
const ImagePickerElement = props => {

  // Variable used to update option's state
  let auxOptions = [];
  // State that stores the state of each option
  const [options, setOptions] = useState([]);
  // Dummy state used to force render
  const [dummyState, setDummyState] = useState(false);
  // Set size according to the number of images per line if available
  const size = (windowWidth-(windowWidth * 0.08))/props.numberPerLine || windowWidth*0.25;


  // Initially sets all options to false and sends an empty array as answer data
  useEffect(() => {
    for (var i = 0; i < props.items.length; i++)
      auxOptions[i] = false;
    // Send data through the onChange prop
    props.onChange(props.pageIndex, props.index, '');

    // Update options state
    setOptions(auxOptions);
  }, []);

  // Called everytime an image is pressed 
  const onChange = index => {

    // Array to save as answer data
    var data = [];
    var _index = null;

    // Fetch options from the state
    auxOptions = options;

    auxOptions.map((a,b) => {if(a)_index=b})

    // Change pressed option according to the multiple/single choice selected
    if(props.singleChoice != true || _index == null || _index == index)
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
                <Image style={{...(options[index] ? styles.imageSelect : styles.image), width: size, height: size  }} source={{ uri: item.imageLink }} />
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
    marginBottom: Dimensions.get('window').height * 0.02,
    fontWeight: 'bold'
  },
  image: {
    borderWidth: 0,
    marginBottom: windowWidth * 0.02
  },
  imageSelect: {
    borderColor: 'grey',
    borderWidth: 4,
    marginBottom: windowWidth * 0.02
  },
  content: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  }
});

export default ImagePickerElement;
