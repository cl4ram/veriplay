<script setup lang="ts">
defineProps<{
  modelValue: string | number
  label?: string
  placeholder?: string
  isEditing?: boolean
  type?: 'text' | 'textarea' | 'search' | string
  textClases?: string
  rules?: any[]
}>()

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="app-input-wrapper">
    <div v-if="!isEditing" class="read-mode">
      <label v-if="label" class="text-caption text-medium-emphasis d-block mb-1">
        {{ label }}
      </label>

      <p :class="`${textClases} text-high-emphasis`">
        {{ modelValue || '---' }}
      </p>
    </div>

    <v-text-field
      v-else-if="type !== 'textarea'"
      :label="label"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      :placeholder="placeholder"
      :type="type"
      variant="outlined"
      density="comfortable"
      hide-details="auto"
      clearable
      class="text-high-emphasis"
      :rules="rules"
    >
      <template v-if="type === 'search'" #prepend-inner>
        <v-icon icon="mdi-magnify" color="grey" />
      </template>
    </v-text-field>

    <v-textarea
      v-else
      :label="label"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      :placeholder="placeholder"
      variant="outlined"
      density="comfortable"
      hide-details="auto"
      auto-grow
      clearable
      rows="3"
      class="text-high-emphasis"
      :rules="rules"
    />
  </div>
</template>

<style scoped>
.read-mode {
  padding: 8px 0;
  min-height: 56px;
}
</style>
