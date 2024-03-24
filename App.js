import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";
import LoginScreen from "./apps/screens/LoginScreen";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./apps/navigations/TabNavigation";

export default function App() {
  return (
    // <ClerkProvider publishableKey="pk_test_b24tc3BpZGVyLTU2LmNsZXJrLmFjY291bnRzLmRldiQ">
      // {/* <ScrollView className="h-full w-full flex-1"> */}
          // {/* <SignedIn> */}
        <View className="w-full h-full bg-gray-50 flex-1">
            <NavigationContainer>
              <TabNavigation />
            </NavigationContainer>
          <StatusBar style="auto" />
          </View>
          // {/* </SignedIn> */}
      //     {/* <SignedOut>
      //       <LoginScreen />
      //     </SignedOut> */}
      // {/* </ScrollView> */}
    // </ClerkProvider>
  );
}
