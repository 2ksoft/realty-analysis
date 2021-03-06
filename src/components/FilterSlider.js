import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Dimensions } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

const FilterSlider = (props) => {
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(100);
  props.change(minVal, maxVal);

  return (
    <View style={styles.range}>
      <Text style={{ fontSize: 15, fontWeight: "bold" }}>{props.title}</Text>
      <View style={styles.priceInput}>
        <TextInput
          style={styles.input}
          placeholder={minVal + props.placeholder}
          placeholderTextColor='black'
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder={maxVal + props.placeholder}
          placeholderTextColor='black'
        ></TextInput>
      </View>
      <MultiSlider
        trackStyle={{ backgroundColor: "#bdc3c7" }}
        selectedStyle={{ backgroundColor: "#5e5e5e" }}
        values={[props.min, props.max]}
        sliderLength={Dimensions.get("window").width - 40}
        onValuesChangeFinish={(values) => {
          setMinVal(values[0]);
          setMaxVal(values[1]);
          props.change(minVal, maxVal);
        }}
        min={props.min}
        max={props.max}
        step={props.step}
        allowOverlap={false}
        snapped={true}
      />
      <View style={styles.containMinMax}>
        <Text style={styles.minMax}>MIN</Text>
        <Text style={styles.minMax}>MAX</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  range: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  minMax: {
    fontSize: 13,
    fontWeight: "bold",
    color: "grey",
    marginRight: 300,
  },
  containMinMax: { flexDirection: "row", justifyContent: "space-between" },
  priceInput: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  input: {
    margin: 10,
    width: 160,
    padding: 12,
    marginTop: 16,
    borderColor: "#bbb",
    borderWidth: 1,
    borderWidth: 2,
    borderRadius: 10,
  },
});

export default FilterSlider;
