import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import CustomInput from "./src/components/CustomInput/CustomInput";
import CustomButton from "./src/components/CustomButton";
import Navigation from "./src/Navigation";
import SignInScreen from "./src/screens/SignInScreen/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen/SignUpScreen";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <SignInScreen/>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
