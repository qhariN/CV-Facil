<script setup>
import ProgressSection from './ProgressSection.vue'

const sections = [
  {
    name: 'Información personal',
    description: 'Agrega tus datos personales básicos, como nombre, información de contacto y ubicación',
    route: 'personal-information'
  },
  {
    name: 'Páginas web',
    description: 'Agrega enlaces a tus páginas web, como tu sitio web personal, tu perfil de LinkedIn o tu cuenta de Twitter',
    route: 'web-page'
  },
  {
    name: 'Perfil profesional',
    description: 'Describe quién eres, cuantos años de experiencia tienes y cuáles son tus habilidades',
    route: 'professional-profile'
  },
  {
    name: 'Experiencia laboral',
    description: 'Detalla tu historial laboral, incluyendo las empresas, los cargos, las responsabilidades clave y los logros destacados',
    route: 'work-experience'
  },
  {
    name: 'Educación',
    description: 'Menciona tu formación académica, como títulos obtenidos, instituciones educativas y fechas relevantes',
    route: 'education'
  },
  {
    name: 'Habilidades técnicas',
    description: 'Destaca las habilidades interpersonales y profesionales que posees y que son relevantes para el puesto que deseas',
    route: 'personal-information'
  },
  {
    name: 'Información adicional',
    description: 'Agrega cualquier información relevante que desees destacar y que no encaje en las secciones anteriores',
    route: 'my-cvs'
  }
]
</script>

<template>
  <div class="flex flex-col items-center gap-10 w-full max-w-xl">
    <h2 class="text-3xl font-bold text-center text-stone-600">
      Elige una sección<br>
      para comenzar
    </h2>
    <ul class="max-w-lg rounded-2xl border border-stone-200 shadow-lg shadow-stone-400/10 divide-y divide-stone-200 text-sm overflow-hidden">
      <ProgressSection v-for="(section, index) in sections" :key="index" :name="section.name" :description="section.description" :route="section.route" />
    </ul>
  </div>
</template>
