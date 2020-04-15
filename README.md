# react-native-json-forms
[![GitHub license](https://img.shields.io/badge/license-MIT-red.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/react-native-json-forms.svg?style=flat)](https://www.npmjs.com/package/react-native-json-forms)

## Description
Tool to create forms in React Native from a JSON file containing the form description. This tool is compatible with forms created using [SurveyJS](https://surveyjs.io/) but contains some extra features and also allows extensions. Information about the elements can be found in the Wiki's [Elements Page](https://github.com/mleitao27/react-native-json-forms/wiki/Elements), there can be found brief description about the different form element that can be used, how to use them and the data extracted from their answers. Information about how to implement the extension mechanism is in the Wiki's [Extensions Page](https://github.com/mleitao27/react-native-json-forms/wiki/Extensions).

## Installation
```
$ npm install --save react-native-json-forms
```

## Usage
Bellow there is an example of usage of the **Form** component imported from the package. The **FormScreen** can be any application screen used as a parent component.
```javascript
// Import stuff from react and react-native
import React from 'react';
import { ScrollView } from 'react-native';
// Import the component from the package
import Form from 'react-native-json-forms';

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
#### json:
Passes a JSON file containing the description of the form structure and details.  
#### extension:
Passes a JavaScript file containing the description of the extension elements that the user wants to implement.
#### onSubmit:
Passes a function that receives an JavaScript object as argument containing the answer to the form.
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

## Coming Soon
The issues found will be solved and implemented in future versions. Issues to be solved soon:
- Matrix and Matrix Dropdown fix layout
- Matrix Dynamic
- Panel and Panel Dynamic implementation
## Contributors
- Miguel Leitão
- Guilherme Eugénio
## License and Copyright
© Miguel Leitão and Guilherme Eugénio, INESC-ID  
Licensed under the [MIT License](LICENSE)
