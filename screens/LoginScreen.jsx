import { View, Image, Text, TouchableOpacity, Button } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";
import React from "react";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View>
      <Image
        source={require("../../assets/images/auth-bg.jpg")}
        className="w-[400px] h-[400px] mb-4 object-cover"
      />
      <View className="bg-white h-full px-16 pt-8 rounded-t-3xl shadow-md">
        <Text className=" text-center text-2xl font-semibold px-4 text-secondary">
          Buy & Sell Online
        </Text>
        <Text className=" text-center text-sm text-gray-700">
          Buy and sell productw without leaving you're couche
        </Text>
        <View className="mt-8 h-[40px] bg-primary rounded-full flex justify-center items-center ">
          <Text
            className="
              font-semibold
            text-onPrimary
              leading-2
              w-full
              text-center
            "
            onPress={onPress}
          >
            Get Started
          </Text>
          {/* <Button title="get started" className="rounded-pill " /> */}
        </View>
      </View>
    </View>
  );
}
