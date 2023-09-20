import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const NumberInput = ({ min, max }) => {
  const [value, setValue] = useState(1);

  const handleIncrement = () => {
    if (value < max) {
      setValue(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      setValue(value - 1);
    }
  };

  const handleInputChange = (text) => {
    const newValue = parseInt(text, 10);

    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      setValue(newValue);
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity onPress={handleDecrement} style={{ marginRight: 10 }}>
        <AntDesign name="minuscircleo" size={24} color="black" />
      </TouchableOpacity>
      <TextInput
        style={{
          borderRadius: 10,
          padding: 10,
          fontSize: 16,
          flex: 1,
          backgroundColor: "#5df4a0",
          width: "5vw",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
        keyboardType="numeric"
        onChangeText={handleInputChange}
        value={value.toString()}
      />
      <TouchableOpacity onPress={handleIncrement} style={{ marginLeft: 10 }}>
        <AntDesign name="pluscircleo" size={24} color="black" />
      </TouchableOpacity>
      {(value < min || value > max) && (
        <Text style={{ color: "red", marginLeft: 10 }}>
          Value must be between {min} and {max}
        </Text>
      )}
    </View>
  );
};

export default NumberInput;
