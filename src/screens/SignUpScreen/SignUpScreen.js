import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView, Checkbox } from "react-native";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton";
import { Controller, useForm } from "react-hook-form";
import CustomCheckBox from "../../components/CustomCheckBox/CustomCheckBox";
import axios from "axios";

const EMAIL_REGEX = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
const PASSWORD_REGEX = /^(?=.*\d)[A-Za-z\d]{6,}$/;
const SignUpScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const parolaVerificata = watch("password");
  const mailVerificat = watch("email");

  const validateAge = (birthdate) => {
    const [day, month, year] = birthdate.split("/").map(Number);
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age >= 18 || "Trebuie să aveți cel puțin 18 ani";
  };

  const onSignInPress = () => {
    console.log("Pressed");
  };
  const url = "https://my-json-server.typicode.com/typicode/demo/db";
  const onSignUpPressed = async (data) => {
    try {
      const response = await axios.post(url, {
        email: data.email,
        email_again: data.email_again,
        password: data.password,
        password_again: data.password_again,
        first_name: data.prenume,
        last_name: data.nume,
        address: data.adresa,
        cnp: data.cnp,
        birth_date: data.date_of_birth,
        confirm_adult: true,
        emailmarketing: false,
        accept_terms: true,
      });

      console.log("API Response:", response.data);
      if (response.status === 200) {
        try {
          const authToken = data.auth_token;
          const expirationDate = data.auth_token_expiration_date;
          console.log("Auth token stored successfully");
        } catch (error) {
          console.error("Error storing auth token:", error);
        }
      }
    } catch (error) {
      console.error("API Error:", error.response.data);
    }
  };

  return (
    <>
      <ScrollView>
        <View style={styles.root}>
          <Text style={styles.title}>Inregistreaza-te</Text>
          <CustomInput
            name="email"
            placeholder="Completeaza email"
            control={control}
            rules={{
              required: "Mail-ul este obligatoriu",
              pattern: { value: EMAIL_REGEX, message: "Email-ul este invalid" },
            }}
          />

          <CustomInput
            name="email_again"
            placeholder="Reintrodu email"
            control={control}
            rules={{
              required: "Reintroducerea email-ului este obligatorie",
              validate: (value) =>
                value === mailVerificat || "Mail-urile sunt diferite",
              pattern: { value: EMAIL_REGEX, message: "Email-ul este invalid" },
            }}
          />

          <CustomInput
            name="password"
            placeholder="Completeaza parola"
            control={control}
            rules={{
              required: "Parola este obligatorie",
              pattern: {
                value: PASSWORD_REGEX,
                message:
                  "Parola trebuie să aibă minim 6 caractere și cel puțin o cifră",
              },
            }}
            secureTextEntry
          />

          <CustomInput
            name="password_again"
            placeholder="Confirma parola"
            control={control}
            secureTextEntry
            rules={{
              required: "Reintroducerea parolei este obligatorie",
              validate: (value) =>
                value === parolaVerificata || "Parolele sunt diferite",
            }}
          />

          <CustomInput
            name="phone_number"
            placeholder="Completeaza numarul de telefon"
            control={control}
          />

          <CustomInput
            name="nume"
            placeholder="Completeaza numele"
            control={control}
            rules={{ required: "Numele este obligatoriu" }}
          />
          <CustomInput
            name="prenume"
            placeholder="Completeaza prenumele"
            control={control}
            rules={{ required: "Prenumele este obligatoriu" }}
          />

          <CustomInput
            name="cnp"
            placeholder="Completeaza cnp-ul"
            control={control}
            rules={{ required: "CNP-ul este obligatoriu" }}
          />
          <CustomInput
            name="adresa"
            placeholder="Completeaza adresa"
            control={control}
            rules={{ required: "Adresa este obligatorie" }}
          />
          <CustomInput
            name="date_of_birth"
            placeholder="Data nașterii (DD/MM/YYYY)"
            control={control}
            rules={{
              required: "Data nașterii este obligatorie",
              pattern: {
                value: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
                message: "Data nașterii trebuie să fie în formatul DD/MM/YYYY",
              },
              validate: validateAge,
            }}
          />

          <CustomButton
            text="Inregistreaza-te"
            onPress={handleSubmit(onSignUpPressed)}
          />

          <CustomButton
            text="Ai deja un cont? Intra in contul tau"
            onPress={onSignInPress}
            type="TERTIARY"
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
});

export default SignUpScreen;
