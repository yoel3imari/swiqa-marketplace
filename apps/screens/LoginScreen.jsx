import { View, Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();

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
        className="w-[400px] h-[400px] mb-4"
      />
      <View className="bg-white px-4 pt-8 shadow-md">
        <Text
          className="
            text-center
            text-2xl 
            font-bold
            text-secondary
            mb-2
          "
        >
          SWIQA
        </Text>
        <Text
          className="
            text-center
            text-sm
            text-gray-700
            w-full
          "
        >
          A marketplace to Buy and sell used items online.
          Make money online by selling things that you don't use anymore
          to people who need them.
        </Text>
        <View className="px-8">
        <TouchableOpacity
          onPress={onPress}
          className="
            p-4
            mt-8
          bg-primary
            rounded-full
            flex
            items-center 
            justify-center
          "
        >
          <Text className="text-onPrimary font-semibold">Get Started</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}