<template>
  <div>
    <div class="results-grid">
      <div 
        v-for="name in names" 
        :key="name.id"
        class="name-card"
        @click="showDetails(name)"
      >
        <div class="name-value">{{ name.value }}</div>
        <div class="name-description">{{ name.description }}</div>
        <el-button 
          size="small" 
          type="primary" 
          @click.stop="saveName(name)"
          :disabled="name.saved"
        >
          {{ name.saved ? 'Saved' : 'Save' }}
        </el-button>
      </div>
    </div>

    <div class="generate-button">
      <el-button 
        type="primary" 
        size="large"
        @click="$emit('generate')"
      >
        Generate More Names
      </el-button>
    </div>

    <el-dialog
      v-model="dialogVisible"
      :title="selectedName ? selectedName.value : 'Name Details'"
      width="50%"
    >
      <template v-if="selectedName">
        <p><strong>Name:</strong> {{ selectedName.value }}</p>
        <p><strong>Description:</strong> {{ selectedName.description }}</p>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  names: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['generate'])

const dialogVisible = ref(false)
const selectedName = ref(null)

const showDetails = (name) => {
  selectedName.value = name
  dialogVisible.value = true
}

const saveName = (name) => {
  name.saved = true
  ElMessage.success('Name saved successfully')
}
</script> 