import { StyleSheet, Text, Pressable } from 'react-native';
import React, { useState } from 'react';

const FilterBTN = ({ title }) => {
  const [active, setActive] = useState(false);

  const toggleState = () => {
    setActive(!active);
  };

  return (
    <Pressable
      style={[
        styles.button,
        {
          backgroundColor: active ? '#09331d' : 'white',
          borderColor: active ? 'white' : '#09331d',
        },
      ]}
      onPress={toggleState}
    >
      <Text style={{ color: active ? 'white' : '#09331d',fontSize:20}}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal:5,
    alignItems:'center',
    justifyContent:'center'
  },
});

export default FilterBTN;
