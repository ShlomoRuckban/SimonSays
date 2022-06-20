import React from 'react';
import {TouchableOpacity, View, StyleSheet} from "react-native"

const ColorComp = ({isUserTurn, color, onPress}: any) => {
    
    React.useEffect(() => {},[color])

    return (
        <TouchableOpacity
            activeOpacity={isUserTurn ? 0 : 1}
            onPress={onPress}>
            <View
              style={[
                styles.colorContainer,
                {backgroundColor: color}
              ]}
            />
          </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    colorContainer: {
        width: 150,
        height: 150,
    }
})
export default ColorComp;