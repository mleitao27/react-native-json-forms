import React, { useState, useEffect } from 'react';
import { Button, View, Dimensions, StyleSheet, Alert } from 'react-native';

import BooleanElement from './elements/BooleanElement';
import CameraElement from './elements/CameraElement';
import CheckboxElement from './elements/CheckboxElement';
import CommentElement from './elements/CommentElement';
import DateTimePickerElement from "./elements/DateTimePickerElement";
import DropdownElement from './elements/DropdownElement';
import ExpressionElement from './elements/ExpressionElement';
import FileElement from './elements/FileElement';
import HtmlElement from './elements/HtmlElement';
import ImageElement from './elements/ImageElement';
import ImagePickerElement from "./elements/ImagePickerElement";
import MatrixDropdownElement from './elements/MatrixDropdownElement';
import MatrixDynamicElement from './elements/MatrixDynamicElement';
import MatrixElement from './elements/MatrixElement';
import MultipleTextElement from './elements/MultipleTextElement';
import PanelDynamicElement from './elements/PanelDynamicElement';
import PanelElement from './elements/PanelElement';
import RadioElement from './elements/RadioElement';
import RangeElement from "./elements/RangeElement";
import RatingElement from './elements/RatingElement';
import TextElement from './elements/TextElement';

const Form = props => {

    // Form elements array
    let form = [];
    // Answer data array
    const [data, setData] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    const [allAnswered, setAllAnswered] = useState(false);

    var coreElementFlag = false;

    let alldefined = 0;

    const onChange = (pageIndex, index, value) => {
        var temp = data;
        temp[index] = {type: props.json.pages[pageIndex].elements[index].type, name: props.json.pages[pageIndex].elements[index].name, value: value};
        
        if (typeof props.json.pages[pageIndex].elements[index].id !== 'undefined')
            temp[index]['id'] = props.json.pages[pageIndex].elements[index].id;
        
        setData(temp);

        alldefined = 0;
        data.map(() => alldefined++);

        if (props.json.pages[pageIndex].elements.length === alldefined) {
            if (props.showSubmitButton === false  && coreElementFlag === false)
                if (submitted === false)
                    onSubmit();
            setAllAnswered(true);
        }
    };

    const onSubmit = () => {
        if (props.showSubmitButton !== false || coreElementFlag === true) {
            if (allAnswered) props.onSubmit(data);
            else Alert.alert('ERROR', 'All the survey fields must be answered.');
        }
        else {
            props.onSubmit(data);
            setSubmitted(true);
        }
    };

    props.json.pages.map((page, pageIndex) => {
        page.elements.map((e, index) => {
        
            if (e.type === 'boolean') {
                coreElementFlag = true;
                form.push(
                    <BooleanElement 
                        key={index} 
                        onChange={onChange} 
                        index={index} 
                        pageIndex={pageIndex}
                        title={e.name} 
                    />
                );
            }
            else if (e.type === 'camera')  {
                coreElementFlag = true;
                form.push(
                    <CameraElement 
                        key={index} 
                        onChange={onChange} 
                        index={index} 
                        pageIndex={pageIndex}
                        title={e.name}
                    />
                );
                }
            else if (e.type === 'checkbox') {
                coreElementFlag = true;
                form.push(
                    <CheckboxElement 
                        key={index} 
                        onChange={onChange} 
                        index={index} 
                        pageIndex={pageIndex}
                        title={e.name}
                        items={e.choices} 
                    />
                );
                }
            else if (e.type === 'comment') {
                coreElementFlag = true;
                form.push(
                    <CommentElement 
                        key={index} 
                        onChange={onChange} 
                        index={index} 
                        pageIndex={pageIndex}
                        title={e.name}
                    />
                );
            }
            else if (e.type === 'datepicker') {
                if (e.mode === 'manual') coreElementFlag = true;
                form.push(
                    <DateTimePickerElement 
                        key={index}
                        onChange={onChange}
                        index={index}
                        pageIndex={pageIndex}
                        title={e.name} 
                        mode={'date'}
                        type={e.mode}
                    />
                );
            }
            else if (e.type === 'timepicker') {
                coreElementFlag = true;
                form.push(
                    <DateTimePickerElement 
                        key={index}
                        onChange={onChange}
                        index={index}
                        pageIndex={pageIndex}
                        title={e.name} 
                        mode={'time'}
                        type={e.mode}
                    />
                );
            }
            else if (e.type === 'dropdown') {
                coreElementFlag = true; 
                form.push(
                    <DropdownElement
                        key={index}
                        onChange={onChange}
                        index={index}
                        pageIndex={pageIndex}
                        title={e.name}
                        items={e.choices} 
                    />
                );
            }
            else if (e.type === 'expression') {
                form.push(
                    <ExpressionElement
                        key={index}
                        onChange={onChange}
                        index={index}
                        pageIndex={pageIndex}
                        title={e.name}
                        expression={e.commentText}
                    />
                );
            }
            else if (e.type === 'file') {
                coreElementFlag = true; 
                form.push(
                    <FileElement
                        key={index}
                        onChange={onChange}
                        index={index}
                        pageIndex={pageIndex}
                        title={e.name}
                    />
                );
            }
            else if (e.type === 'geolocation') {
                coreElementFlag = true; 
                form.push(
                    <GeolocationElement
                        key={index}
                        onChange={onChange}
                        index={index}
                        pageIndex={pageIndex}
                    />
                );
            }
            else if (e.type === 'html') {
                coreElementFlag = true; 
                form.push(
                    <HtmlElement
                        key={index}
                        onChange={onChange}
                        index={index}
                        pageIndex={pageIndex}
                        title={e.name}
                        html={e.html}
                    />
                );
            }
            else if (e.type === 'image') {
                coreElementFlag = true; 
                form.push(
                    <ImageElement
                        key={index}
                        onChange={onChange}
                        index={index}
                        pageIndex={pageIndex}
                        title={e.name}
                        url={e.imageLink}
                    />
                );
            }
            else if (e.type === 'imagepicker') {
                coreElementFlag = true; 
                form.push(
                    <ImagePickerElement
                        key={index}
                        onChange={onChange}
                        index={index}
                        pageIndex={pageIndex}
                        title={e.name}
                        items={e.choices} 
                    />
                );
            }
            else if (e.type === 'matrixdropdown') {
                coreElementFlag = true; 
                form.push(
                    <MatrixDropdownElement
                        key={index}
                        onChange={onChange}
                        index={index}
                        pageIndex={pageIndex}
                        title={e.name}
                        rows={e.rows}
                        columns={e.columns}
                        choices={e.choices}
                    />
                );
            }
            else if (e.type === 'matrixdynamic') {
                coreElementFlag = true; 
                form.push(
                    <MatrixDynamicElement
                        key={index}
                        onChange={onChange}
                        index={index}
                        pageIndex={pageIndex}
                        title={e.name}
                    />
                );
            }
            else if (e.type === 'matrix') {
                coreElementFlag = true; 
                form.push(
                    <MatrixElement
                        key={index}
                        onChange={onChange}
                        index={index}
                        pageIndex={pageIndex}
                        title={e.name}
                        rows={e.rows}
                        columns={e.columns}
                    />
                );
            }
            else if (e.type === 'multipletext') {
                coreElementFlag = true; 
                form.push(
                    <MultipleTextElement
                        key={index}
                        onChange={onChange}
                        index={index}
                        pageIndex={pageIndex}
                        title={e.name}
                        items={e.items}
                    />
                );
            }
            else if (e.type === 'paneldynamic') {
                coreElementFlag = true; 
                form.push(
                    <PanelDynamicElement
                        key={index}
                        onChange={onChange}
                        index={index}
                        pageIndex={pageIndex}
                        title={e.name}
                    />
                );
            }
            else if (e.type === 'panel') {
                coreElementFlag = true; 
                form.push(
                    <PanelElement
                        key={index}
                        onChange={onChange}
                        index={index}
                        pageIndex={pageIndex}
                        title={e.name}
                    />
                );
            }
            else if (e.type === 'radiogroup') {
                coreElementFlag = true; 
                form.push(
                    <RadioElement
                        key={index}
                        onChange={onChange}
                        index={index}
                        pageIndex={pageIndex}
                        title={e.name}
                        items={e.choices} 
                    />
                );
            }
            else if (e.type === 'range') {
                coreElementFlag = true; 
                form.push(
                    <RangeElement
                        key={index}
                        onChange={onChange}
                        index={index}
                        pageIndex={pageIndex}
                        title={e.name}
                        min={e.min}
                        max={e.max} 
                        step={e.step} 
                    />
                );
            }
            else if (e.type === 'rating') {
                coreElementFlag = true; 
                form.push(
                    <RatingElement
                        key={index}
                        onChange={onChange}
                        index={index}
                        pageIndex={pageIndex}
                        title={e.name}
                    />
                );
            }
            else if (e.type === 'text') {
                coreElementFlag = true; 
                form.push(
                    <TextElement
                        key={index}
                        onChange={onChange}
                        index={index}
                        pageIndex={pageIndex}
                        title={e.name} 
                    />
                );
            }

            props.extension.map(ext => {
                if (e.type === ext.type)
                    form.push(
                        <ext.component
                            key={index}
                            onChange={onChange}
                            index={index}
                            pageIndex={pageIndex}
                            props={e}
                        />
                    );
            });

        });
    });

    var submitButton = <Button title='Submit' onPress={onSubmit}/>;
    if(props.showSubmitButton === false && coreElementFlag === false) submitButton = <View/>;

    return (
        <View style={styles.container}>
            {form}
            {submitButton}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Dimensions.get('window').width * 0.03,
        paddingVertical: Dimensions.get('window').height * 0.03,
    }
});

export default Form;