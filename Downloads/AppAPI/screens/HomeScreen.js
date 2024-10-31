import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { UserContext } from '../contexts/UserContext';

const HomeScreen = ({ navigation }) => {
  const { user, setUser, setToken } = useContext(UserContext);

  const logout = () =>{
    setUser("");
    setToken("");
    navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Seja Bem Vindo, {user}!</Text>
      <Button
        title="Sair"
        onPress={logout} // Navega para o tab navigator de livros
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
