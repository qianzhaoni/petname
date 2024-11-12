import { defineStore } from 'pinia'
import axios from 'axios'

export const useNameStore = defineStore('name', {
  state: () => ({
    generatedNames: [],
    loading: false,
    error: null
  }),
  
  actions: {
    async generateNames(params) {
      this.loading = true
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/names/generate`, params)
        this.generatedNames = response.data.data
        return response.data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    }
  }
}) 