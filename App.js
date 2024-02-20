import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import LoginScreen from "./apps/screens/LoginScreen";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";

export default function App() {
  return (
    <ClerkProvider publishableKey="pk_test_b24tc3BpZGVyLTU2LmNsZXJrLmFjY291bnRzLmRldiQ">
      <View className="w-full bg-gray-50 flex-1">
        <SignedIn>
          <View className="h-full flex items-center justify-center">
            <Text>Signed In</Text>
          </View>
        </SignedIn>
        <SignedOut>
          <LoginScreen />
        </SignedOut>
        <StatusBar style="auto" />
      </View>
    </ClerkProvider>
  );
}
