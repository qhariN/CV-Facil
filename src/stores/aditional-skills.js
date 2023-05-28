import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useAditionalSkillsStore = defineStore('aditionalSkills', () => {
  const skills = ref([])

  init()

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

  const completed = computed(() => skills.value.length > 0 && skills.value.every(skill => skill.topic && skill.list))

  watch(skills, (value) => localStorage.setItem('aditionalSkills', JSON.stringify(value)), { deep: true })

  function init () {
    const storedSkills = localStorage.getItem('aditionalSkills')
    if (!storedSkills) addAditionalSkills()
    else skills.value = JSON.parse(storedSkills)
  }

  function addAditionalSkills () {
    skills.value.push({ topic: '', list: '' })
  }

  function removeAditionalSkills (index) {
    skills.value.splice(index, 1)
  }

  return { skills, completed, addAditionalSkills, removeAditionalSkills, aditionalSkillsSection }
})
