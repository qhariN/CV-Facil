<script setup>
import { onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

onMounted(() => {
  watch(() => route.query.access_token, (newValue, oldValue) => {
    verifyAccessToken(newValue)
  }, { immediate: true })
})

function verifyAccessToken (accessToken) {
  if (accessToken) {
    localStorage.setItem('access_token', accessToken)
    router.push('my-cvs')
  } else {
    const hasAccessToken = localStorage.getItem('access_token')
    if (!hasAccessToken) infojobsLogin()
  }
}

function infojobsLogin () {
  window.location.href = '/api/infojobs/login'
}
</script>

<template>
  my cvs view
</template>
