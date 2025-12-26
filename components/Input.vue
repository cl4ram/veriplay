<script setup lang="ts">
defineProps<{
  modelValue: string | number
  label?: string
  placeholder?: string
  isEditing?: boolean
  type?: string
}>()

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="app-input-wrapper">
    <div v-if="!isEditing" class="read-mode">
      <label v-if="label" class="text-caption text-grey-lighten-1 d-block mb-1">{{ label }}</label>
      <p class="text-body-1 font-weight-medium text-white">
        {{ modelValue || '---' }}
      </p>
    </div>

    <v-text-field
      v-else
      :label="label"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      :placeholder="placeholder"
      :type="type === 'textarea' ? 'text' : type"
      variant="outlined"
      color="red-darken-4"
      density="comfortable"
      hide-details="auto"
      clearable
      :auto-grow="type === 'textarea'"
      :textarea="type === 'textarea'"
    >
      <template v-if="type === 'search'" #prepend-inner>
        <v-icon icon="mdi-magnify" color="grey" />
      </template>
    </v-text-field>
  </div>
</template>

<style scoped>
.read-mode {
  padding: 8px 0;
  min-height: 56px;
}
</style>
