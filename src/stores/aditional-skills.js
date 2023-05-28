import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useAditionalSkillsStore = defineStore('aditionalSkills', () => {
  const skills = ref([])

  addAditionalSkills()

  const aditionalSkillsSection = computed(() => ({
    columns: [
      {
        width: 120,
        text: 'Información adicional',
        style: 'sectionTitle'
      },
      {
        width: '*',
        columns: [
          skills.value.map((skill, i) => ([
            {
              text: skill.topic,
              style: ['subSectionTitle', ...(i > 0 ? ['mt10'] : [])]
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

  function addAditionalSkills () {
    skills.value.push({ topic: '', list: '' })
  }

  return { skills, addAditionalSkills, aditionalSkillsSection }
})
