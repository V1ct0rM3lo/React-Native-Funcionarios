import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const EmployeesListScreen = () => {
  const { token } = useContext(UserContext);
  const [employees, setEmployees] = useState([]);
  const navigation = useNavigation();

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/funcionarios/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
      alert('Erro ao carregar a lista de funcionários!');
    }
  };

  useFocusEffect(() => {
    fetchEmployees(); 
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={employees}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.employeeItem}>
            <Text style={styles.employeeName}>{item.nome}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.iconButton} 
                onPress={() => navigation.navigate('EditEmployee', { employeeId: item.id })}
              >
                <Ionicons name="pencil" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.iconButton} 
                onPress={() => navigation.navigate('EmployeeDetails', { employeeId: item.id })}
              >
                <Ionicons name="search" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  employeeItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginVertical: 10 
  },
  employeeName: { 
    flex: 1, 
    fontSize: 16 
  },
  buttonContainer: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  iconButton: { 
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 5,
    marginLeft: 5,
  },
});

export default EmployeesListScreen;
