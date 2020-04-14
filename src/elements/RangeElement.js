// Imports
import React, { useState, useEffect } from "react";
import {
  Slider,
  View,
  Text,
  StyleSheet,
  Dimensions
} from "react-native";

import Colors from "../constants/colors";

// Range inserted by user built with react native Slider component
const RangeElement = props => {

  // State that stores input text
  const [value, setValue] = useState(props.min);

  // On first render send default value in answer data in the form component
  useEffect(() => {
    props.onChange(props.pageIndex, props.index, props.min);
  }, []);

  // When user changes slider value
  const sliderHandler = enteredValue => {
    // Updates value of state
    setValue(enteredValue);
    // Sends answer value to form
    props.onChange(props.pageIndex, props.index, enteredValue);
  };

  // If the user inserts a step, otherwise 1 by default
  const step = props.step || 1;

  return (
    <View styel={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.value}>{String(value)}</Text>
      <Slider
        style={styles.slider}
        minimumValue={props.min}
        maximumValue={props.max}
        step={step}
        minimumTrackTintColor={Colors.primary}
        maximumTrackTintColor={Colors.primary}
        onValueChange={sliderHandler}
        thumbTintColor={Colors.primary}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    paddingVertical: Dimensions.get('window').height * 0.05
  },
  title: {
    fontSize: 18,
    marginBottom: Dimensions.get("window").height * 0.02,
  },
  slider: {
    shadowColor: "black",
    width: '100%',
  },
  value: {
    textAlign: "right",
    fontSize: 15,
    color: Colors.primary
  }
});

export default RangeElement;
