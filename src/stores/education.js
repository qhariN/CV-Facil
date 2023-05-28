import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useEducationStore = defineStore('education', () => {
  const educations = ref([])

  addEducation()

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

  function set (data) {
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

  function parseDate (date) {
    const monthYear = new Date(date).toLocaleString('es', { year: 'numeric' })
    return monthYear
  }

  return { educations, set, addEducation, educationSection }
})
