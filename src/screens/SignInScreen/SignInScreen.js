import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useForm } from "react-hook-form";
import axios from "axios";

const EMAIL_REGEX = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
const SignInScreen = () => {
  console.log("SignInScreen rendered");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);

  const onSignInPressed = async (data) => {
    try {
      const response = await axios.post(
        "https://intw3.famdev.ro/app/public/api/authenticate",
        {
          email: data.email,
          password: data.parola,
        }
      );
      console.log("API Response:", response.data);
      if (response.status === 200) {
        Alert.alert("Success", "You are logged in!");
        const authToken = data.auth_token;
        const expirationDate = data.auth_token_expiration_date;
      } else {
        Alert.alert("Error", data.loginError);
      }
    } catch (error) {
      console.error("API Error:", error.response.data);
    }
  };
  const onSignUpPress = () => {
    console.log("Pressed");
  };
  return (
    <>
      <View style={styles.root}>
        <CustomInput
          name="email"
          placeholder="Completeaza email-ul"
          control={control}
          rules={{
            required: "Mail-ul este obligatoriu",
            pattern: { value: EMAIL_REGEX, message: "Email-ul este invalid" },
          }}
        />

        <CustomInput
          name="parola"
          placeholder="Introdu parola"
          control={control}
          rules={{ required: "Parola este obligatorie" }}
          secureTextEntry
        />

        <CustomButton
          text="Logheaza-te"
          onPress={handleSubmit(onSignInPressed)}
        />

        <CustomButton
          text="Creeaza un cont"
          onPress={onSignUpPress}
          type="TERTIARY"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
});

export default SignInScreen;
