<script setup>
import { useTechnicalSkillsStore } from '../../stores/technical-skills'
import BasicInput from '../BasicInput.vue'
import BasicTextarea from '../BasicTextarea.vue'
import RouterButton from '../RouterButton.vue'
import SecondaryButton from '../SecondaryButton.vue'
import SimpleTrash from '../icons/SimpleTrash.vue'

const technicalSkillsStore = useTechnicalSkillsStore()
</script>

<template>
  <div class="flex flex-col gap-10 w-full max-w-xl">
    <div class="space-y-6">
      <h2 class="text-3xl font-bold text-stone-600">
        Tus habilidades técnicas
      </h2>
      <p class="font-bold text-base text-stone-400">
        Añade las habilidades interpersonales y profesionales que posees, así como las herramientas y tecnologías que conoces.
      </p>
    </div>
    <div class="space-y-6">
      <template v-for="(skill, index) in technicalSkillsStore.skills" :key="index">
        <div class="flex items-center gap-4 text-lg font-bold">
          <div class="w-12 h-12 bg-stone-800 text-stone-200 rounded-full flex justify-center items-center">{{ index + 1 }}</div>
          <span class="text-stone-700">
            {{ skill.topic? skill.topic : 'Habilidades técnicas' }}
          </span>
          <button v-if="technicalSkillsStore.skills.length > 1" @click="technicalSkillsStore.removeTechnicalSkills(index)" type="button" class="ms-auto w-12 h-12 bg-stone-100/30 border border-stone-200 hover:border-stone-300 transition duration-300 rounded-full shadow-lg shadow-stone-400/10 hover:shadow-stone-400/20 flex justify-center items-center">
            <SimpleTrash class="w-5 h-5" />
          </button>
        </div>
        <BasicInput v-model="skill.topic" id="topic-{{ index }}" label="Nombre de la sección" placeholder="Tecnologías CI/CD" />
        <BasicTextarea v-model="skill.list" id="list-{{ index }}" :rows="3" label="Lista de habilidades" placeholder="Docker, Kubernetes, Jenkins, Gitlab CI, Github Actions, etc." />
      </template>
    </div>
    <div class="flex gap-4">
      <SecondaryButton @click="technicalSkillsStore.addTechnicalSkills">
        Añadir sección
      </SecondaryButton>
      <SecondaryRouterButton to="/wizard" class="ms-auto">
        Volver
      </SecondaryRouterButton>
      <RouterButton to-route-name="aditional-skills">Siguiente</RouterButton>
    </div>
  </div>
</template>
