<template>
  <div>
    <div class="form-grid">
      <div class="form-control">
        <div class="form-label">Breed</div>
        <el-select v-model="form.breed" placeholder="Select breed">
          <el-option 
            v-for="breed in breeds" 
            :key="breed.value" 
            :label="breed.label" 
            :value="breed.value">
          </el-option>
        </el-select>
      </div>

      <div class="form-control">
        <div class="form-label">Gender</div>
        <el-radio-group v-model="form.gender">
          <el-radio label="boy">Boy</el-radio>
          <el-radio label="girl">Girl</el-radio>
        </el-radio-group>
      </div>

      <div class="form-control name-style">
        <div class="form-label">Name Style</div>
        <el-radio-group v-model="form.nameStyle">
          <el-radio label="unique">Unique Names</el-radio>
          <el-radio label="cute">Cute Names</el-radio>
          <el-radio label="funny">Funny Names</el-radio>
        </el-radio-group>
      </div>
    </div>

    <div class="tag-group">
      <div class="tag-group-title">Color</div>
      <div class="tags-container">
        <span 
          v-for="color in colors" 
          :key="color.id"
          class="tag"
          :class="{ active: form.color === color.id }"
          @click="selectColor(color.id)"
        >
          {{ color.name }}
        </span>
      </div>
    </div>

    <div class="tag-group">
      <div class="tag-group-title">Personality Traits (Select up to 3)</div>
      <div class="tags-container">
        <span 
          v-for="trait in personalityTraits" 
          :key="trait.id"
          class="tag"
          :class="{ active: form.personalities.includes(trait.id) }"
          @click="togglePersonality(trait.id)"
        >
          {{ trait.name }}
        </span>
      </div>
    </div>

    <div class="tag-group">
      <div class="tag-group-title">Additional Requirements (Optional)</div>
      <el-input
        v-model="form.customRequirements"
        type="textarea"
        :rows="3"
        placeholder="Enter any additional requirements for your pet's name"
      ></el-input>
    </div>

    <div class="generate-button">
      <el-button 
        type="primary" 
        size="large" 
        @click="handleSubmit"
        :loading="loading"
      >
        Generate Names
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  loading: Boolean
})

const emit = defineEmits(['generate'])

const form = ref({
  breed: '',
  gender: 'boy',
  nameStyle: 'unique',
  color: null,
  personalities: [],
  customRequirements: ''
})

const breeds = [
  { label: 'Husky', value: 'husky' },
  { label: 'Golden Retriever', value: 'golden' },
  { label: 'German Shepherd', value: 'german-shepherd' },
  { label: 'Labrador', value: 'labrador' },
  { label: 'Poodle', value: 'poodle' },
  { label: 'Bulldog', value: 'bulldog' },
  { label: 'Rottweiler', value: 'rottweiler' },
  { label: 'Beagle', value: 'beagle' },
  { label: 'Yorkshire Terrier', value: 'yorkshire' },
  { label: 'Boxer', value: 'boxer' }
]

const colors = [
  { id: 1, name: 'Black' },
  { id: 2, name: 'White' },
  { id: 3, name: 'Brown' },
  { id: 4, name: 'Golden' },
  { id: 5, name: 'Grey' },
  { id: 6, name: 'Spotted' },
  { id: 7, name: 'Mixed' }
]

const personalityTraits = [
  { id: 1, name: 'Friendly' },
  { id: 2, name: 'Playful' },
  { id: 3, name: 'Brave' },
  { id: 4, name: 'Calm' },
  { id: 5, name: 'Smart' },
  { id: 6, name: 'Loyal' },
  { id: 7, name: 'Energetic' },
  { id: 8, name: 'Gentle' },
  { id: 9, name: 'Independent' },
  { id: 10, name: 'Protective' },
  { id: 11, name: 'Curious' },
  { id: 12, name: 'Athletic' }
]

const selectColor = (colorId) => {
  form.value.color = colorId
}

const togglePersonality = (traitId) => {
  const index = form.value.personalities.indexOf(traitId)
  if (index === -1) {
    if (form.value.personalities.length < 3) {
      form.value.personalities.push(traitId)
    } else {
      ElMessage.warning('You can select up to 3 traits')
    }
  } else {
    form.value.personalities.splice(index, 1)
  }
}

const handleSubmit = () => {
  if (!form.value.breed || !form.value.color || form.value.personalities.length === 0) {
    ElMessage.warning('Please complete all required fields')
    return
  }
  emit('generate', form.value)
}
</script> 