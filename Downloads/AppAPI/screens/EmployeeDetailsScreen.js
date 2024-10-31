import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { useRoute, useNavigation } from '@react-navigation/native';

const EmployeeDetailsScreen = () => {
  const { token } = useContext(UserContext);
  const [employee, setEmployee] = useState(null);
  const route = useRoute();
  const { employeeId } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/funcionarios/editar/${employeeId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEmployee(response.data);
      } catch (error) {
        console.error(error);
        alert('Erro ao carregar os detalhes do funcionário!');
      }
    };
    fetchEmployee();
  }, [employeeId, token]);

  const handleDeleteEmployee = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/funcionarios/excluir/${employeeId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Funcionário excluído com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      alert('Erro ao excluir o funcionário!');
    }
  };

  if (!employee) return <Text>Carregando...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{employee.nome}</Text>
      <Text>Cargo: {employee.cargo}</Text>
      <Text>Salário: {employee.salario}</Text>
      <Button title="Excluir Funcionário" onPress={handleDeleteEmployee} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
});

export default EmployeeDetailsScreen;
