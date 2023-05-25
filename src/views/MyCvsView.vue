<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import wretch from 'wretch'

const route = useRoute()
const router = useRouter()

const curriculums = ref([])

onMounted(() => {
  watch(() => route.query.access_token, value => {
    verifyAccessToken(value)
  }, { immediate: true })
})

function verifyAccessToken (accessToken) {
  if (accessToken) {
    localStorage.setItem('access_token', accessToken)
    router.push('my-cvs')
  } else {
    const hasAccessToken = localStorage.getItem('access_token')
    if (!hasAccessToken) infojobsLogin()
    else getCurriculums()
  }
}

function infojobsLogin () {
  window.location.href = '/api/infojobs/login'
}

async function getCurriculums () {
  const accessToken = localStorage.getItem('access_token')
  const data = wretch('/api/infojobs/curriculum')
    .headers({
      Authorization: `Bearer ${accessToken}`
    })
    .get()
  curriculums.value = await data.json()
}
</script>

<template>
  <div class="z-10">
    my cvs view
  </div>
</template>
