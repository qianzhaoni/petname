<template>
  <div>
    <div class="hero-section">
      <h1>AI Pet Name Generator</h1>
      <p>Create the perfect name for your furry friend with our intelligent name generator</p>
    </div>

    <div class="main-container">
      <div class="generator-card">
        <div class="section-title">Customize Your Pet's Profile</div>
        
        <!-- Form content -->
        <PetForm @generate="generateNames" />
        
        <!-- Results -->
        <NameResults 
          v-if="store.generatedNames.length" 
          :names="store.generatedNames" 
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNameStore } from '../stores/name'
import PetForm from '../components/PetForm.vue'
import NameResults from '../components/NameResults.vue'

const store = useNameStore()

const generateNames = async (params) => {
  try {
    await store.generateNames(params)
  } catch (error) {
    console.error('Failed to generate names:', error)
  }
}
</script>

<style scoped>
/* ... 样式保持不变 ... */
</style> 