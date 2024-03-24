import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import { styled } from "nativewind";

import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";

import { db } from "../firebase";
import { SafeAreaView } from "react-native-safe-area-context";

const AddPostScreen = () => {
  useEffect(() => {
    getCategories();
    userLocation();

    return;
  }, []);

  const [categList, setCategList] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // latitudeDelta: 0.0922,
  // longitudeDelta: 0.0421,

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    console.log(location);
    setMapRegion({
      ...mapRegion,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  const getCategories = async () => {
    setCategList([]);
    const querySnapshot = await getDocs(collection(db, "categories"));
    // console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      console.log(doc.id);
      setCategList((categList) => [
        ...categList,
        { id: doc.id, ...doc.data() },
      ]);
    });
  };

  const onMapPress = (options) => {
    setMapRegion({
      ...mapRegion,
      latitude: options.nativeEvent.coordinate.latitude,
      longitude: options.nativeEvent.coordinate.longitude,
    });
  };

  const initValues = {
    title: "",
    desc: "",
    categ: "",
    price: "",
    image: "",
  };

  const onSubmit = async (values) => {
    try {
      const res = await addDoc(collection(db, "posts"), {
        ...values,
        latitude: mapRegion.latitude,
        longitude: mapRegion.longitude
      })
    } catch (error) {
      // console.error(error);
      Alert.alert(error.message)
    }
  };

  const StyledPicker = styled(
    Picker,
    "bg-white border-2 border-primary rounded-md p-2 mb-4"
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        className="
          pt-8
          px-4
        "
      >
        <View className="mb-8 w-full text-center">
          <Text className="mb-2 text-2xl font-bold text-center text-primary">
            Add New Post
          </Text>
          <Text className="text-center text-onPrimary">
            Create a new post for an item you want to sell as a used product.
            Make sure you fill the form below with the right infos to reach the
            right crowd. Good luck!
          </Text>
        </View>
        <Formik initialValues={initValues} onSubmit={onSubmit}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <TextInput
                className="
                border-2
                border-primary
                rounded-md
                text-gray-900
                font-semibold
                p-2
                mb-4
                bg-white
              "
                placeholder="Title"
                value={values.title}
                onChangeText={handleChange("title")}
              />
              <TextInput
                className="
                border-2
                border-primary
                rounded-md
                text-gray-900
                font-semibold
                p-2
                mb-4
                bg-white
              "
                textAlignVertical="top"
                placeholder="Description"
                value={values.desc}
                numberOfLines={5}
                onChangeText={handleChange("desc")}
              />
              <TextInput
                className="
                border-2
                border-primary
                rounded-md
                text-gray-900
                font-semibold
                p-2
                mb-4
                bg-white
              "
                keyboardType="number-pad"
                placeholder="Price"
                value={values.price}
                onChangeText={handleChange("price")}
              />
              <StyledPicker
                className="
                bg-white
                p-2
                mb-4
              "
                selectedValue={values.categ}
                onValueChange={handleChange("categ")}
              >
                {categList.map((c, index) => (
                  <Picker.Item key={index} label={c.label} value={c.id} />
                ))}
              </StyledPicker>

              <View className="h-[200px] mb-4">
                <MapView
                  region={mapRegion}
                  showsUserLocation={true}
                  userLocationPriority="high"
                  showsMyLocationButton={true}
                  animateToRegion={{ region: mapRegion, duration: 1000 }}
                  onPress={onMapPress}
                  className="w-full h-full border-2 border-primary"
                >
                  <Marker coordinate={mapRegion} />
                </MapView>
              </View>

              <View
                className="
                flex
                mt-4
                mb-16
                items-start
              "
              >
                <TouchableOpacity
                  onPress={handleSubmit}
                  className="
                    bg-primary
                    py-3
                    px-4
                    min-w-[120px]
                    rounded-md
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Text className="text-gray-900 font-bold">Add Post</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

/* <SafeAreaView className=" bg-gray-50 flex-1 h-full">
</SafeAreaView> */

export default AddPostScreen;
