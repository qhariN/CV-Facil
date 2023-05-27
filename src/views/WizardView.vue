<script setup>
import ResumePreview from '../components/ResumePreview.vue'
</script>

<template>
  <div class="min-w-full min-h-screen flex">
    <div class="w-1/2 min-h-screen relative">
      <div class="bg w-full h-full absolute"></div>
      <div class="w-full h-full flex justify-center items-center">
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

<style>
.bg {
  background-image: radial-gradient(at 27% 37%,#3a8bfd 0,transparent 0),radial-gradient(at 97% 21%,#855afc 0,transparent 50%),radial-gradient(at 52% 99%,#E93E40 0,transparent 50%),radial-gradient(at 10% 29%,#167DB7 0,transparent 50%),radial-gradient(at 97% 96%,#F1C40F 0,transparent 50%),radial-gradient(at 33% 50%,#167DB7 0,transparent 50%),radial-gradient(at 79% 53%,#FF6340 0,transparent 50%);
  filter: blur(100px) saturate(150%);
  opacity: .1;
  z-index: -10;
}
</style>
