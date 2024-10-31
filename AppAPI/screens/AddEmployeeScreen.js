import React, { useContext, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';

const AddEmployeeScreen = () => {
  const { token } = useContext(UserContext);
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [salario, setSalario] = useState('');

  const handleAddEmployee = async () => {
    try {
      await axios.post('http://localhost:3000/api/funcionarios/novo', {
        nome,
        cargo,
        salario,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Funcionário adicionado com sucesso!');
      setNome('');
      setCargo('');
      setSalario('');
    } catch (error) {
      console.error(error);
      alert('Erro ao adicionar funcionário!');
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
      <Button title="Adicionar Funcionário" onPress={handleAddEmployee} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 },
});

export default AddEmployeeScreen;
