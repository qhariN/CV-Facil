import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useTechnicalSkillsStore = defineStore('technicalSkills', () => {
  const skills = ref([])

  init()

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

  const isEmpty = computed(() => skills.value.length <= 1 && !skills.value[0].topic && !skills.value[0].list)

  watch(skills, (value) => localStorage.setItem('technicalSkills', JSON.stringify(value)), { deep: true })

  function init () {
    const storedSkills = localStorage.getItem('technicalSkills')
    if (!storedSkills) addTechnicalSkills()
    else skills.value = JSON.parse(storedSkills)
  }

  function addTechnicalSkills () {
    skills.value.push({ topic: '', list: '' })
  }

  function removeTechnicalSkills (index) {
    skills.value.splice(index, 1)
  }

  return { skills, completed, isEmpty, addTechnicalSkills, removeTechnicalSkills, technicalSkillsSection }
})
