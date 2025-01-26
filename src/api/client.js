import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5293/Scheduling', 
  headers: {
    'Content-Type': 'application/json',
  }
});

export const createOneScheduling = async (name, inicio, fim, periodos) => {
  try {
    const response = await api.post('', {
      name,
      inicio,
      fim,
      periodos
    });
    return response.data; 
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    throw error; 
  }
};

export const getAllSchedulings = async () => {
  try {
    const response = await api.get('');  
    return response.data;  
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    throw error;  
  }
};

export const getSchedulingById = async (id) => {
  try {
    const response = await api.get(`/${id}`); 
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar agendamento:', error);
    throw error; 
  }
};



export const updateScheduling = async (id, name, inicio, fim, periodos) => {
  try {
    const response = await api.put(`/${id}`, {
      name,
      inicio,
      fim,
      periodos
    });
    return response.data; 
  } catch (error) {
    console.error('Erro ao atualizar agendamento:', error);
    throw error;  
  }
};

export const deleteScheduling = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;  
  } catch (error) {
    console.error('Erro ao deletar agendamento:', error);
    throw error;  
  }
};



