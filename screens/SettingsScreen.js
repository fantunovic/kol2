import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, Image } from "react-native";



export function SettingsScreen({ route, navigation }) {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch("https://api.sampleapis.com/wines/reds")
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
                  <Text style={styles.textbold}>{item.wine}</Text>
                  <Text style={styles.text}>Winery: {item.winery}</Text>
                  <Text style={styles.text}>Location: {item.location}</Text>
                  <Text style={styles.text}>Rating: {item.rating.average}</Text>
                  <Text style={styles.text}>Reviews: {item.rating.reviews}</Text>
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
    backgroundColor: "#F04026"

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

  textbold: {
   fontWeight:"bold",
   color: "white",
   fontSize: 18
  },

  text: {

    color: "white"
   },
 

});
