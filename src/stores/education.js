import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useEducationStore = defineStore('education', () => {
  const educations = ref([])

  init()

  const educationSection = computed(() => ({
    columns: [
      {
        width: 120,
        text: 'Educación',
        style: 'sectionTitle'
      },
      {
        width: '*',
        columns: [
          educations.value.map((education, i) => ([
            {
              text: education.title,
              style: ['subSectionTitle', ...(i > 0 ? ['mt10'] : [])]
            },
            {
              text: `en ${education.institution}`,
              style: 'subSectionTitle'
            },
            {
              text: `${education.startingDate} - ${education.finishingDate}`,
              style: 'italic'
            },
            {
              text: education.location,
              style: 'italic'
            }
          ])).flat()
        ]
      }
    ]
  }))

  const completed = computed(() => educations.value.length > 0 && educations.value.every(education => education.title && education.institution && education.location && education.startingDate && education.finishingDate))

  watch(educations, (value) => localStorage.setItem('educations', JSON.stringify(value)), { deep: true })

  function init () {
    const storedEducations = localStorage.getItem('educations')
    if (!storedEducations) addEducation()
    else educations.value = JSON.parse(storedEducations)
  }

  function set (data) {
    if (!data.education) return
    educations.value = data.education.map(education => ({
      title: education.courseName ?? '',
      institution: education.institutionName ?? '',
      location: '',
      startingDate: education.startingDate ? parseDate(education.startingDate) : '',
      finishingDate: education.stillEnrolled ? 'Actualidad' : parseDate(education.finishingDate)
    }))
  }

  function addEducation () {
    educations.value.push({
      title: '',
      institution: '',
      location: '',
      startingDate: '',
      finishingDate: ''
    })
  }

  function removeEducation (index) {
    educations.value.splice(index, 1)
  }

  function parseDate (date) {
    const monthYear = new Date(date).toLocaleString('es', { year: 'numeric' })
    return monthYear
  }

  return { educations, completed, set, addEducation, removeEducation, educationSection }
})
