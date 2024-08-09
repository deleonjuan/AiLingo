import Button from "@components/common/Button";
import Text from "@components/common/Text";
import { FormTextInput } from "@components/common/TextInput";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  ToastAndroid,
  View,
} from "react-native";
import { UnistylesRuntime } from "react-native-unistyles";
import { useAppDispatch, useAppSelector } from "src/hooks/hooks";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  initialState as settingsInitialState,
  settingsActions,
} from "src/store/slices/settings";
import Icon from "@components/common/Icon";
import { authActions } from "src/store/slices/auth";

export default function SettingsScreen() {
  const dispatch = useAppDispatch();
  const { settings } = useAppSelector((state) => state.settingsReducer);

  const schema = z
    .object({
      apiKey: z.string(),
      excercisesPerLesson: z.string().min(1, "Este campo es obligatorio"),
      language: z.string(),
      languageLearning: z.string(),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: settings,
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    const newSettings = { ...settings, ...data };
    dispatch(settingsActions.setSettings(newSettings));

    if (Platform.OS === "ios") {
      console.log("settings saved succesfully");
    } else {
      ToastAndroid.show("settings saved succesfully", ToastAndroid.SHORT);
    }
  };

  const onExit = () => {
    dispatch(settingsActions.setSettings(settingsInitialState.settings));
    dispatch(authActions.setUserName(null))
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "black" }}
    >
      <View
        style={{
          paddingTop: UnistylesRuntime.statusBar.height,
          paddingHorizontal: 16,
          flex: 1,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 24, marginBottom: 24 }}>DEV SETTINGS</Text>
          <Pressable onPress={onExit}>
            <Icon name="log-out" color="white" />
          </Pressable>
        </View>
        <ScrollView
          style={{
            flex: 1,
          }}
        >
          <Controller
            control={control}
            name="apiKey"
            render={({ field }) => (
              <FormTextInput
                label="GOOGLE GEMINI API KEY"
                field={field}
                secureTextEntry
                placeholder={
                  settings.apiKey.length > 1
                    ? "***********************"
                    : "api key"
                }
                error={errors?.apiKey?.message ?? ""}
              />
            )}
          />

          <Controller
            control={control}
            name="excercisesPerLesson"
            render={({ field }) => (
              <FormTextInput
                label="Ejercicios por lección"
                field={field}
                placeholder={"5"}
                keyboardType="numeric"
                error={errors?.excercisesPerLesson?.message ?? ""}
              />
            )}
          />
          <Controller
            control={control}
            name="language"
            render={({ field }) => (
              <FormTextInput
                label="Lenguaje principal"
                field={field}
                placeholder={"español"}
                aria-disabled={true}
                editable={false}
              />
            )}
          />
          <Controller
            control={control}
            name="languageLearning"
            render={({ field }) => (
              <FormTextInput
                label="Lenguaje a aprender"
                field={field}
                placeholder={"ingles"}
                editable={false}
              />
            )}
          />

          <Button
            style={{ marginTop: 24 }}
            onPress={handleSubmit(onSubmit)}
            label="Guardar"
          />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
