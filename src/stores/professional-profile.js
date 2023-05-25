import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useProfessionalProfileStore = defineStore('professionalProfile', () => {
  const description = ref('')

  const professionalProfileSection = computed(() => ({
    columns: [
      {
        width: 120,
        text: 'Perfil profesional',
        style: 'sectionTitle'
      },
      {
        width: '*',
        text: description.value,
        style: 'gray'
      }
    ]
  }))

  function set (data) {
    description.value = data.cvtext
  }

  return { description, set, professionalProfileSection }
})
