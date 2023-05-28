<script setup>
import ResumePreview from '../components/ResumePreview.vue'
</script>

<template>
  <div class="min-w-full min-h-screen max-h-screen flex">
    <div class="w-1/2 min-h-screen bg-stone-50 shadow-xl shadow-stone-400/30 overflow-y-auto">
      <div class="w-full min-h-full flex justify-end items-center px-12 2xl:px-20 py-16">
        <RouterView v-slot="{ Component }">
          <Transition name="fade" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </div>
    </div>
    <ResumePreview />
  </div>
</template>
