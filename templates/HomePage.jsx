import React, { useEffect, useState } from "react";
import { StyleSheet,Text, View,FlatList,Image,TouchableOpacity} from "react-native";
import { Link } from "react-router-native";
import { useDispatch, useSelector } from "react-redux";

const next = require('../img/next.png')
const previous = require('../img/previous.png')

import { GetPokemonList } from '../actions/Pokeaction'
import { SafeAreaView } from "react-navigation";
import { TextInput } from "react-native"



export default function Home() {
  const [searchText, setSearchText] = useState('')
  const pokemonList = useSelector((state) => state.PokemonList);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const fetchData = (page) => {
    dispatch(GetPokemonList(page));
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
      style={{width:'97%', height:50, backgroundColor:'#808080', padding:10, margin:20 }}
      value={searchText}
      onChangeText={(e) => setSearchText(e)}
      placeholder='Search your pokemon'>
      </TextInput>
      <FlatList
        data={pokemonList.data}
        keyExtractor={(pokemon) => pokemon.name }
        contentContainerStyle={{ flexGrow: 1 }}
        style={styles.list}
        renderItem={({ item }) => (
          <Link to={`/pokemon/${item.name}`}>
            <View
              style={{
                alignItems:'center',
                justifyContent:'center',
                borderWidth: 5,
                backgroundColor: '#363636',
                padding: 20,
                display: "flex",
                
              }}
            >
              <View>
                <Text style={{color:'#fff', fontSize:17, width:'100%'}}>{`${item.name[0].toUpperCase()}${item.name.slice(1)}`}</Text>
                
              </View>
            </View>
          </Link>
        )}
      />
      <View style={styles.pageBox}>
        <View>
          {page == 1 ? (
            <TouchableOpacity
              onPress={() => {
                setPage(page - 1);
              }}
              disabled
            >
              <Image
                style={[styles.sizeIcon, styles.disableIcon]}
                source={previous}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setPage(page - 1);
              }}
            >
              <Image style={styles.sizeIcon} source={previous} />
            </TouchableOpacity>
          )}
        </View>
        <View style={{ display: "flex", justifyContent: "center" }}>
          <Text style={{ fontSize: 18, color:'#fff'}}>{page}</Text>
        </View>

        {page == 45 ? (
          <TouchableOpacity
            onPress={() => {
              setPage(page + 1);
            }}
            disabled
          >
            <Image
              style={[styles.sizeIcon, , styles.disableIcon]}
              source={next}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setPage(page + 1);
            }}
          >
            <Image style={styles.sizeIcon} source={next} />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    width: "100%",
    flexGrow: 1,
    backgroundColor: '#000000'
  },
  pageBox: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: '#000000',
    color:"#fff"
  },
  sizeIcon: {
    marginTop:10,
    width: 60,
    height: 60,
    backgroundColor:'gray',
    borderRadius:30
  },
  disableIcon: {
    opacity: 0.3,
  },
});
