import { useEffect, useState } from "react";
import {
  Button,
  Image,
  View,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "./ThemedText";
const windowWidth = Dimensions.get("window").width;

export default function ImagePickerExample({
  title = null,
  onSetImgSlip = () => {
    console.log("not defined");
  },
  initialImg = null,
}) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      // all :  All media types
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);

      onSetImgSlip(result.assets[0]);
    }
  };

  function conditionalRenderImage() {
    if (image) {
      return (
        <Pressable style={styles.container} onPress={pickImage}>
          <Image source={{ uri: image }} style={styles.image} />
        </Pressable>
      );
    } else {
      return (
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
          onPress={pickImage}
        >
          <Ionicons name="image-outline" size={32} color="black" />
          {title ? (
            <ThemedText style={{ fontSize: 12, color: "#8A8A8A" }} type="title">
              {title}
            </ThemedText>
          ) : null}
        </Pressable>
      );
    }
  }

  useEffect(() => {
    if (initialImg) {
      conditionalRenderImage();
    }
  }, [initialImg]);

  return <View>{conditionalRenderImage()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: windowWidth * 0.9,
    height: "100%",
    // width: "100%",
    // backgroundColor: "#EEEEEE",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    width: windowWidth * 0.9,
    // height: 200,
    transform: [{ scale: 1 }],
    // height: windowWidth * 0.9,
    // height: 200,
    borderRadius: 8,
    // objectFit: "contain",
  },
});
