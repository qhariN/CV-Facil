import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

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

  return { accessToken, verifyAccessToken, login }
})
