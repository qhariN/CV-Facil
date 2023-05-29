<script setup>
import { useAditionalSkillsStore } from '../../stores/aditional-skills'
import BasicInput from '../BasicInput.vue'
import BasicTextarea from '../BasicTextarea.vue'
import SimpleTrash from '../icons/SimpleTrash.vue'

const aditionalSkillsStore = useAditionalSkillsStore()
</script>

<template>
  <div class="flex flex-col gap-10 w-full max-w-xl">
    <div class="space-y-6">
      <h2 class="text-3xl font-bold text-stone-600">
        Tus habilidades adicionales
      </h2>
      <p class="font-bold text-base text-stone-400">
        Añade las habilidades adicionales que tengas y que sean relevantes para el puesto que deseas.
      </p>
    </div>
    <div class="space-y-6">
      <template v-for="(skill, index) in aditionalSkillsStore.skills" :key="index">
        <div class="flex items-center gap-4 text-lg font-bold">
          <div class="w-12 h-12 bg-stone-800 text-stone-200 rounded-full flex justify-center items-center">{{ index + 1 }}</div>
          <span class="text-stone-700">
            {{ skill.topic? skill.topic : 'Habilidades adicionales' }}
          </span>
          <button v-if="aditionalSkillsStore.skills.length > 1" @click="aditionalSkillsStore.removeAditionalSkills(index)" type="button" class="ms-auto w-12 h-12 bg-stone-100/30 border border-stone-200 hover:border-stone-300 transition duration-300 rounded-full shadow-lg shadow-stone-400/10 hover:shadow-stone-400/20 flex justify-center items-center">
            <SimpleTrash class="w-5 h-5" />
          </button>
        </div>
        <BasicInput v-model="skill.topic" id="topic-{{ index }}" label="Nombre de la sección" placeholder="Idiomas" />
        <BasicTextarea v-model="skill.list" id="list-{{ index }}" :rows="3" label="Lista de habilidades" placeholder="Inglés - C1, Francés - B2" />
      </template>
    </div>
    <div class="flex gap-4">
      <button @click="aditionalSkillsStore.addAditionalSkills" type="button" class="text-xl bg-stone-100/30 border border-stone-200 hover:border-stone-300 transition duration-300 px-8 py-4 rounded-xl shadow-lg shadow-stone-400/10 hover:shadow-stone-400/20">
        Añadir sección
      </button>
      <RouterLink to="/wizard" class="ms-auto text-xl text-white bg-gradient-to-t from-stone-800 to-black/80 hover:bg-black transition duration-300 px-8 py-4 rounded-xl shadow-lg shadow-stone-400/10 hover:shadow-stone-400/20">
        Finalizar
      </RouterLink>
    </div>
  </div>
</template>
