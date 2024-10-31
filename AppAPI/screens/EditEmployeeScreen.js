import React, { useContext, useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { useRoute, useNavigation } from '@react-navigation/native';

const EditEmployeeScreen = () => {
  const { token } = useContext(UserContext);
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [salario, setSalario] = useState('');
  const route = useRoute();
  const { employeeId } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/funcionarios/editar/${employeeId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setNome(response.data.nome);
        setCargo(response.data.cargo);
        setSalario(response.data.salario);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEmployee();
  }, [employeeId, token]);

  const handleEditEmployee = async () => {
    try {
      await axios.put(`http://localhost:3000/api/funcionarios/editar/${employeeId}`, { 
        nome,
        cargo,
        salario,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Funcionário atualizado com sucesso!');
      navigation.navigate('EmployeeList');
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar funcionário!');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome do funcionário"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Cargo do funcionário"
        value={cargo}
        onChangeText={setCargo}
      />
      <TextInput
        style={styles.input}
        placeholder="Salário do funcionário"
        value={salario}
        onChangeText={setSalario}
        keyboardType="numeric"
      />
      <Button title="Salvar Alterações" onPress={handleEditEmployee} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 },
});

export default EditEmployeeScreen;
