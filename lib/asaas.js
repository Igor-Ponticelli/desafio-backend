// lib/asaas.js
import axios from 'axios';

const ASAAS_API_KEY = process.env.ASAAS_API_KEY;
const BASE_URL = 'https://api-sandbox.asaas.com/v3/accounts'

export async function criarSubconta(dados) {
  try {
    const response = await axios.post(`${BASE_URL}`, dados, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'access_token': ASAAS_API_KEY
      }      
    });

    console.log('Subconta criada:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar subconta:', error.response?.data || error.message);
    throw error;
  }
}
