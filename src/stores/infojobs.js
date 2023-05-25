import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import wretch from 'wretch'

export const useInfojobsStore = defineStore('infojobs', () => {
  const router = useRouter()

  const accessToken = ref(localStorage.getItem('access_token'))

  function verifyAccessToken (newAccessToken, fn) {
    if (newAccessToken) {
      localStorage.setItem('access_token', newAccessToken)
      router.push('my-cvs')
    } else {
      const hasAccessToken = localStorage.getItem('access_token')
      if (!hasAccessToken) login()
      else fn()
    }
  }

  function login () {
    window.location.href = '/api/infojobs/login'
  }

  function fetch (url) {
    return wretch(url)
      .headers({
        Authorization: `Bearer ${accessToken.value}`
      })
  }

  function getCurriculums () {
    const data = fetch('/api/infojobs/curriculum').get()
    return data.json()
  }

  function getPersonalData (curriculumId) {
    const data = fetch(`/api/infojobs/curriculum/${curriculumId}/personaldata`).get()
    return data.json()
  }

  function getCvText (curriculumId) {
    const data = fetch(`/api/infojobs/curriculum/${curriculumId}/cvtext`).get()
    return data.json()
  }

  function getExperience (curriculumId) {
    const data = fetch(`/api/infojobs/curriculum/${curriculumId}/experience`).get()
    return data.json()
  }

  function getEducation (curriculumId) {
    const data = fetch(`/api/infojobs/curriculum/${curriculumId}/education`).get()
    return data.json()
  }

  return { accessToken, verifyAccessToken, login, getCurriculums, getPersonalData, getCvText, getExperience, getEducation }
})
