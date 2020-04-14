// Imports
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/Ionicons";
import Colors from "../constants/colors";

// Date and time pickers built with the DateTimePicker
const DateTimePickerElement = props => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [selectedDateTime, setSelectedDatetime] = useState('');

  // Initial answer data
  useEffect(() => {
    // If manual input selected in JSON
    if (props.type === 'manual')
      // Save empty string as default answer
      props.onChange(props.pageIndex, props.index, '');
    // If automatic input selected
    else {
      // Get current date
      var data = '';
      var date = new Date();

      // If date picker selected
      if (props.mode === 'date')
        // Send formated date (dd-mm-yyyy)
        data = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
      // If time picker selected
      else if (props.mode === 'time')
        // Send formated time (hh:mm:ss)
        data = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

      // Save answer data with onChange prop
      props.onChange(props.pageIndex, props.index, data);
    }
  }, []);

  // When a date or time is picked
  const onChange = (event, selectedDateTime) => {
    // Check if date/time was picked or popup dismissed
    if (event.type === 'set') {
      var data = '';
      const currentDate = selectedDateTime || date;

      setShow(Platform.OS === 'ios');
      setDate(currentDate);

      // If date picker selected
      if (props.mode === 'date')
        // Send formated date (dd-mm-yyyy)
        data = `${selectedDateTime.getDate()}-${selectedDateTime.getMonth()}-${selectedDateTime.getFullYear()}`;
      // If time picker selected
      else if (props.mode === 'time')
        // Send formated time (hh:mm:ss)
        data = `${selectedDateTime.getHours()}:${selectedDateTime.getMinutes()}:${selectedDateTime.getSeconds()}`;

      setSelectedDatetime(data);
      // Save answer data with onChange prop
      props.onChange(props.pageIndex, props.index, data);
    }
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  // Set mode (date/time) depending on props.mode
  const showDateTimepicker = (mode) => {
    showMode(mode);
  };

  // For auto input nothing is rendered
  let content = <View></View>;

  // For manual input render pickers
  if (props.type === 'manual')
    content = (
      <View style={styles.container}>
        <Text style={styles.title}>{props.title}</Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.button} onPress={showDateTimepicker.bind(this, props.mode)}>
            <Icon name={props.mode === 'date' ? 'ios-calendar' : 'md-time'} size={24} color={Colors.secondary} />
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{selectedDateTime}</Text>
          </View>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
    );

  return (
    <View>
      {content}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    marginBottom: Dimensions.get('window').height * 0.02
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  textContainer: {
    paddingHorizontal: Dimensions.get('window').width * 0.02
  },
  title: {
    fontSize: 18,
    marginBottom: Dimensions.get('window').height * 0.02
  },
  text: {
    fontSize: 16
  },
  button: {
    borderColor: Colors.primary,
    borderWidth: 1,
    paddingHorizontal: Dimensions.get('window').height * 0.01,
    paddingVertical: Dimensions.get('window').height * 0.01,
    borderRadius: 5,
    backgroundColor: Colors.primary
  }
});

export default DateTimePickerElement;