import axios from "axios"

// Configurazione dell'istanza axios personalizzata
const myaxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

// Interceptor per aggiungere il token di autenticazione
myaxios.interceptors.request.use((config) => {
  // Recupera il token dal localStorage o da dove lo conservi
  const token = localStorage.getItem("auth_token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error);
})

// Interceptor per gestire le risposte e gli errori
myaxios.interceptors.response.use((response) => {
  return response
}, (error) => {
  // Gestione errori globali
  if (error.response?.status === 401) {
    // Token scaduto o non valido
    localStorage.removeItem("auth_token")
    window.location.href = "/login"
  }
  return Promise.reject(error);
})

export default myaxios
