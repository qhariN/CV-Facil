import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useTechnicalSkillsStore = defineStore('technicalSkills', () => {
  const skills = ref([])

  addTechnicalSkills()

  const technicalSkillsSection = computed(() => ({
    columns: [
      {
        width: 120,
        text: 'Habilidades técnicas',
        style: 'sectionTitle'
      },
      {
        width: '*',
        columns: [
          skills.value.map(skill => ([
            {
              text: skill.topic,
              style: 'subSectionTitle'
            },
            {
              text: skill.list,
              style: 'gray'
            }
          ])).flat()
        ]
      }
    ]
  }))

  const completed = computed(() => skills.value.length > 0 && skills.value.every(skill => skill.topic && skill.list))

  function addTechnicalSkills () {
    skills.value.push({ topic: '', list: '' })
  }

  return { skills, completed, addTechnicalSkills, technicalSkillsSection }
})
