import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, Image } from "react-native";



export function SettingsScreen({ route, navigation }) {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch("https://api.sampleapis.com/rickandmorty/characters")
      const json = await response.json()
      setData(json)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData();
  }, [])

  function handleHomePress() {
    navigation.navigate("Home");
  }
  return (
    <View style={styles.screen}>
      <Text>The Settings Screen!</Text>
      <Button title="Go to the Home screen!" onPress={handleHomePress} />

      <View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View style={styles.itemWrapper}>
                <View>
                  <Image
                    style={styles.img}
                    source={{
                      uri: `${item.image}`
                    }}
                  />
                </View>
                <View>
                  <Text>{item.name}</Text>
                  <Text>{item.origin}</Text>
                  <Text>{item.species}</Text>
                </View>

              </View>
            )}
          />
        )}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,

  },
  itemWrapper: {
    flexDirection: "row",
    margin: 10
  },
  img: {
    width: 100,
    height: 100,
    resizeMode: "contain"
  },

});
