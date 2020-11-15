# react-native-json-forms
[![GitHub license](https://img.shields.io/badge/license-MIT-red.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/react-native-json-forms.svg?style=flat)](https://www.npmjs.com/package/react-native-json-forms)

## Description
Tool to create forms in React Native from a JSON file containing the form description. This tool is compatible with forms created using [SurveyJS](https://surveyjs.io/) but contains some extra features and also allows extensions. It was built for applications that are being developed using [Expo](https://expo.io/).

Information about the elements can be found in the Wiki's [Elements Page](https://github.com/mleitao27/react-native-json-forms/wiki/Elements), there can be found brief description about the different form element that can be used, how to use them and the data extracted from their answers. Information about how to implement the extension mechanism is in the Wiki's [Extensions Page](https://github.com/mleitao27/react-native-json-forms/wiki/Extensions).

This tool was built by two master student within the scope of their thesis project, if you use react-native-json-form it would be very helpful if you could send some feedback to the [contributors](#Contributors). Information about the usage given to the tool, whether or not was easy to use, favorite and least favorite features and advices would be most apreceated. If possible you could also send a link to the project was used to be added to the [Projects Page](https://github.com/mleitao27/react-native-json-forms/wiki/Projects).

## Installation
```
$ npm install --save react-native-json-forms
```

## Usage
Bellow there is an example of usage of the **Form** component imported from the package. The **FormScreen** can be any application screen used as a parent component. After importing the component from the previously installed npm package, the JSON with the form structure and the extension, the **Form** component can be rendered inside of a **ScrollView** to allow the user to scroll through the form questions, since most form will probably be bigger than a single screen.
```javascript
// Import stuff from react and react-native
import React from 'react';
import { ScrollView } from 'react-native';
// Import the component from the package
import {Form} from 'react-native-json-forms';

// Import JSON file with the form
import data from './data.json';
// Import JS file with the extension
import FormExtension from './FormExtension';

// Parent component
const FormScreen = props => {
    // Handle form answer data
    const onSubmit = (data) => {
        console.log(data);
    };
    // Render component
    return (
        <ScrollView>
            <Form json={data} extension={FormExtension} onSubmit={onSubmit} />
        </ScrollView>
    );
};

export default FormScreen;
```

### Props
#### - json(required):
Passes a JSON file containing the description of the form structure and details.  
#### - extension(required):
Passes a JavaScript file containing the description of the extension elements that the user wants to implement.
#### - onSubmit(required):
Passes a function that receives an JavaScript object as argument containing the answer to the form.
#### - showSubmitButton(optional):
Boolean that when false hides the submit button, useful when extension elements do not require/cannot have submit button. If any of the core elements is used the button automatically appear even when **showSubmitButton** is set to false.
#### - submitText(optional):
String that allows to customize the submit button text.
### JSON File
The JSON file is organized in pages, where each page is an object with a name and an elements array. Bellow there is a snipet with the json structure with only one page. Possible content for the elements array can be found in the [Elements Page](https://github.com/mleitao27/react-native-json-forms/wiki/Elements) as mention above. 
```json
{
    "pages": [
        {
            "name": "page1",
            "elements": [
                ...
            ]
        },
        ...
    ]
}
```
## Question's ID
The questions ID is a feature introduced by version 1.1.0. Because the only way to correlate an answer with its question was through the **type** and **name** this could be limiting in terms of answer processing and analysis. So in order to associate an answer with its respective question an optional **id** field can be added to each element in the survey json. By using the ID feature in the json as shown below the answer to a specific question will also contain an **id** field with the same value as the question's id.
```json
{
    "pages": [
        {
            "name": "page1",
            "elements": [
                {
                    "type": "text",
                    "name": "Is this the best forms tool in the world?",
                    "id": "QUESTION_ID"
                }		
            ]
        },
        ...
    ]
}
```

## Required Elements
The required elements is a feature introduced by version 1.1.8. By adding the **required** field to any of the form's elements impossibilitates its submission until those element's questions are answered. This field defaults to false should receive a boolean as value in the configuration JSON. Elements such as **expression**, **image**, **html** or any custom elements where the final answer may be an empty string may not be compatible with this feature.
```json
{
    "pages": [
        {
            "name": "page1",
            "elements": [
                {
                    "type": "text",
                    "name": "Is this the best forms tool in the world?",
                    "required": {true, false},
                    "id": "QUESTION_ID"
                }		
            ]
        },
        ...
    ]
}
```

## Coming Soon
The issues found will be solved and implemented in future versions. Issues to be solved soon:
- [Matrix and Matrix Dropdown fix layout](https://github.com/mleitao27/react-native-json-forms/issues/1)
- [IOS rotation](https://github.com/mleitao27/react-native-json-forms/issues/2)
- [Image Picker use dimensions](https://github.com/mleitao27/react-native-json-forms/issues/3)
- [Matrix Dynamic implementation](https://github.com/mleitao27/react-native-json-forms/issues/6)
- [Panel and Panel Dynamic implementation](https://github.com/mleitao27/react-native-json-forms/issues/7)
- [Make extension optional](https://github.com/mleitao27/react-native-json-forms/issues/8)

Please leave your contribution in the [Issues](https://github.com/mleitao27/react-native-json-forms/issues) section.

## Contributors
- Miguel Leitão @ <miguel.s.leitao@tecnico.ulisboa.pt>
- Guilherme Eugénio @ <guilherme.eugenio@tecnico.ulisboa.pt>

## License and Copyright
© Miguel Leitão and Guilherme Eugénio, INESC-ID  
Licensed under the [MIT License](LICENSE)
