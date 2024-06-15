
  /** import React from "react";
import { Text, View, StyleSheet} from "react-native";
import { Controller } from "react-hook-form";
import CheckBox from "@react-native-community/checkbox";

const CustomCheckBox = ({ control, name, label, rules = {} }) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <>
          <View style={styles.container}>
            <CheckBox
              isChecked={value}
              onClick={() => onChange(!value)}
              rightText={label}
            />
          </View>
          {error && (
            <Text style={{ color: "red", alignSelf: "stretch" }}>
              {error.message || "Error"}
            </Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
});



  export default CustomCheckBox;*/

  