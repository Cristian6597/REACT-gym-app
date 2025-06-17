// Classe per gestire tutte le chiamate API relative ai trainer
class TrainerService {
  constructor(axiosInstance) {
    this.axios = axiosInstance
  }

  // Crea un nuovo profilo trainer
  async createTrainer(data) {
    try {
      const response = await this.axios.post("/trainers", data)
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message || "Trainer creato con successo",
      }
    } catch (error) {
      console.error("Errore creazione trainer:", error)

      if (error.response?.data) {
        return {
          success: false,
          message: error.response.data.message || "Errore durante la registrazione",
          errors: error.response.data.errors || {},
        }
      }

      return {
        success: false,
        message: "Errore di connessione al server",
      }
    }
  }

  // Ottieni il profilo trainer dell'utente corrente
  async getMyTrainerProfile() {
    try {
      const response = await this.axios.get("/trainers/me")
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message,
      }
    } catch (error) {
      console.error("Errore recupero profilo trainer:", error)

      if (error.response?.data) {
        return {
          success: false,
          message: error.response.data.message || "Errore nel caricamento del profilo",
          errors: error.response.data.errors || {},
        }
      }

      return {
        success: false,
        message: "Errore di connessione al server",
      }
    }
  }

  // Aggiorna il profilo trainer
  async updateTrainer(data) {
    try {
      const response = await this.axios.put("/trainers/me", data)
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message || "Profilo aggiornato con successo",
      }
    } catch (error) {
      console.error("Errore aggiornamento trainer:", error)

      if (error.response?.data) {
        return {
          success: false,
          message: error.response.data.message || "Errore nell'aggiornamento",
          errors: error.response.data.errors || {},
        }
      }

      return {
        success: false,
        message: "Errore di connessione al server",
      }
    }
  }

  // Elimina il profilo trainer
  async deleteTrainer() {
    try {
      const response = await this.axios.delete("/trainers/me")
      return {
        success: true,
        message: response.data.message || "Profilo eliminato con successo",
      }
    } catch (error) {
      console.error("Errore eliminazione trainer:", error)

      if (error.response?.data) {
        return {
          success: false,
          message: error.response.data.message || "Errore nell'eliminazione",
          errors: error.response.data.errors || {},
        }
      }

      return {
        success: false,
        message: "Errore di connessione al server",
      }
    }
  }

  // Ottieni tutti i trainer con filtri opzionali
  async getAllTrainers(params = {}) {
    try {
      const response = await this.axios.get("/trainers", { params })
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message,
      }
    } catch (error) {
      console.error("Errore recupero lista trainer:", error)

      if (error.response?.data) {
        return {
          success: false,
          message: error.response.data.message || "Errore nel caricamento dei trainer",
          errors: error.response.data.errors || {},
        }
      }

      return {
        success: false,
        message: "Errore di connessione al server",
      }
    }
  }

  // Ottieni un trainer specifico per ID
  async getTrainerById(id) {
    try {
      const response = await this.axios.get(`/trainers/${id}`)
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message,
      }
    } catch (error) {
      console.error("Errore recupero trainer:", error)

      if (error.response?.data) {
        return {
          success: false,
          message: error.response.data.message || "Trainer non trovato",
          errors: error.response.data.errors || {},
        }
      }

      return {
        success: false,
        message: "Errore di connessione al server",
      }
    }
  }

  // Cerca trainer per specialità
  async searchTrainersBySpecialty(specialty) {
    try {
      const response = await this.axios.get("/trainers/search", {
        params: { specialty },
      })
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message,
      }
    } catch (error) {
      console.error("Errore ricerca trainer:", error)

      if (error.response?.data) {
        return {
          success: false,
          message: error.response.data.message || "Errore nella ricerca",
          errors: error.response.data.errors || {},
        }
      }

      return {
        success: false,
        message: "Errore di connessione al server",
      }
    }
  }
}

export default TrainerService
