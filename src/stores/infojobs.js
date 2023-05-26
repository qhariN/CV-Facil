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
      accessToken.value = newAccessToken
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

  const BASE_URL = '/api/infojobs/curriculum'

  function getCurriculums () {
    const data = fetch(BASE_URL).get()
    return data.json()
  }

  function getPersonalData (curriculumId) {
    const data = fetch(`${BASE_URL}/${curriculumId}/personaldata`).get()
    return data.json()
  }

  function getCvText (curriculumId) {
    const data = fetch(`${BASE_URL}/${curriculumId}/cvtext`).get()
    return data.json()
  }

  function updateCvText (curriculumId, cvText) {
    const data = fetch(`${BASE_URL}/${curriculumId}/cvtext`).put(cvText)
    return data.json()
  }

  function getExperience (curriculumId) {
    const data = fetch(`${BASE_URL}/${curriculumId}/experience`).get()
    return data.json()
  }

  function getEducation (curriculumId) {
    const data = fetch(`${BASE_URL}/${curriculumId}/education`).get()
    return data.json()
  }

  return { accessToken, verifyAccessToken, login, getCurriculums, getPersonalData, getCvText, updateCvText, getExperience, getEducation }
})
