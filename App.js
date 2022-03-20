import React, { useState } from "react";
import { Provider } from "react-redux";

import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-navigation";

import Store from './store/store'
import HomePage from './templates/HomePage'
import { NativeRouter, Routes, Route } from "react-router-native";

import { Pokemon } from './templates/Pokemon'



export default function App() {
  return (
    <NativeRouter>
      <Provider store={Store}>
        <SafeAreaView>
          <View style={styles.nav}>
            <Text style={{marginTop: 20, color: '#fff', fontSize:25, fontWeight:'bold',  textAlignVertical: "center" }}>POKEDEX</Text>
          </View>
        </SafeAreaView>

        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/pokemon/:pokemonName" exact element={<Pokemon />} />
        </Routes>
      </Provider>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  nav: {
    display: "flex",
    width: "100%",
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#000000'
  },
  pageBox: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: '#000000'
  },
  sizeIcon: {
    width: 60,
    height: 60,
  },
  disableIcon: {
    opacity: 0.3,
  },
});