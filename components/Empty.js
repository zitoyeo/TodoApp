import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

function Empty() {
  const source = require("../assets/images/young_and_happy.png");

  return (
    <View style={styles.block}>
      <Image source={source} style={styles.image} resizeMode="contain" />
      <Text style={styles.description}>야호! 할일이 없습니다.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    fontSize: 24,
    color: "#9e9e9e",
  },
  image: {
    width: 240,
    height: 179,
    marginBottom: 16,
  },
});

export default Empty;
