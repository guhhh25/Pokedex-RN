import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import  { pagi }  from "./HomePage";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-native";
import { GetPokemon } from '../actions/Pokeaction'
import { useEffect } from "react";

import { Link } from "react-router-native";
const nextx = require('./../img/previous.png')

const Abilities = ({ abilityList }) => {
  return (

    <>
      <Text style={styles.abilities}>Skills</Text>
      <View style={styles.abilitiesList}>

        {abilityList.map((item) => {
          const { ability } = item;
          return (
            <Text style={styles.textInfo} key={ability.name}>
              {ability.name.toUpperCase()}
            </Text>

          );
        })}
      </View>
      <Text> </Text>
    </>
  );
};

const Types = ({ typesList }) => {
  return (
    <>

      <Text style={styles.abilities}>Types</Text>
      <View style={styles.abilitiesList}>

        {typesList.map((item) => {
          const { type } = item;
          return (
            <Text key={type.name} style={styles.textInfo}>
              {type.name.toUpperCase()}
            </Text>
          );
        })}
      </View>

    </>
  );
};


export function Pokemon() {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.Pokemon);
  const { pokemonName } = useParams();
  const pokemonAPIData = pokemon?.data?.[pokemonName];
  const urlImage = pokemonAPIData?.sprites?.other?.home?.front_default;
  const page = pagi;
  useEffect(() => {
    dispatch(GetPokemon(pokemonName));
  }, []);
  return (
    !!pokemonAPIData && (
      <View
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <View style={styles.title}>
          <Text style={styles.sizeTitle}>{pokemonName.toUpperCase()} </Text>
        </View>
        <View style={styles.center2}>
        <Link
            to={"/"}
            component={TouchableOpacity}
            style={styles.button}
            activeOpacity={1}
            replace={true}
            underlayColor={"#363636"}
          >
            <Image source={nextx} style={{width:50, height:50}}></Image>
          </Link>
        </View>

        <View style={styles.center}>
          {urlImage === undefined ? (
            <Image
              style={styles.image}
              source={{
                uri: urlImage,
              }}
            />
          ) : (
            <Image
              style={styles.image}
              source={{
                uri: urlImage,
              }}
            />
          )}
        </View>


        <View style={[styles.center]}>
        <Abilities abilityList={pokemonAPIData.abilities} />
        </View>
        <View style={[styles.center]}>
        <Types typesList={pokemonAPIData.types} />
        </View>
        <View style={styles.center}>
        <Text style={styles.subTitles}>Attributes</Text>
        </View>
        <View style={[styles.center, styles.statsBox]}>
        <View style={styles.stats}>
        <Text style={{color:'#fff', fontSize:18}}>{`Peso - ${pokemonAPIData.weight}g`} </Text>
        
        </View>
        <View style={styles.stats}>
        <Text style={{color:'#fff', fontSize:18}}>{`Altura - ${pokemonAPIData.height}cm`} </Text>
        
        </View>

        <View style={styles.stats}>
        <Text style={{color:'#fff', fontSize:18}}>{`ID - ${pokemonAPIData.id}`} </Text>
        
        </View>
        </View>

        
      </View>
    )
  );
}

const styles = StyleSheet.create({
  center: {
    
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:'#363636',
    
  },

  center2: {
    
    marginBottom:-30,
    justifyContent: "center",
    backgroundColor:'#363636',
    
  },

  statsBox: {
    display: 'flex',
    alignItems: "center",
    justifyContent: "space-evenly",
    color: '#fff',
    
  },
  stats: {
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
    display: 'flex'
  },
  title: {
    backgroundColor:'#1C1C1C',
    height:50,
    
    
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    
  },
  sizeTitle: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    
  },
  abilitiesList: {
    
    display: "flex",
    width: 250,
    marginTop:18,
    marginHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  abilities: {
    marginTop: 20,
    fontWeight: "800",
    fontSize: 27,
    
    
    color: "#fff",
  },
  subTitles: {
    marginTop: 20,
    fontWeight: "800",
    fontSize: 25,
    color: "#fff",
  },
  textInfo: {
    marginHorizontal: 40,
    backgroundColor: "#6A5ACD",
    borderRadius: 8,
    padding: 10,
    color: "#fff",
  },

  image: {
    width: 200,
    height: 200,
  },
  button: {
    borderRadius: 20,
    padding: 30,
    color: "#fff",
  },
});