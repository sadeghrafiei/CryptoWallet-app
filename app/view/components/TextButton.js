import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {COLORS, FONTS} from '../../assets/constants';

const TextButton = ({label, containerStyle, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        paddingVertical: 3,
        justifyContent: 'center',
        paddingHorizontal: 18,
        borderRadius: 15,
        backgroundColor: COLORS.gray1,
        ...containerStyle,
      }}
      onPress={onPress}>
      <Text style={{color: COLORS.white, ...FONTS.h3}}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;
