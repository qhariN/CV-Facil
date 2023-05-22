<script setup>
import ProgressSection from './ProgressSection.vue'

const sections = [
  {
    name: 'Información personal',
    description: 'Agrega tus datos personales básicos, como nombre, información de contacto y dirección'
  },
  {
    name: 'Perfil profesional',
    description: 'Describe quién eres, cuantos años de experiencia tienes y cuáles son tus habilidades'
  },
  {
    name: 'Experiencia laboral',
    description: 'Detalla tu historial laboral, incluyendo los nombres de las empresas, los cargos que ocupaste, las responsabilidades clave y los logros destacados'
  },
  {
    name: 'Educación',
    description: 'Menciona tu formación académica, como títulos obtenidos, instituciones educativas y fechas relevantes'
  },
  {
    name: 'Habilidades técnicas',
    description: 'Destaca las habilidades técnicas, interpersonales y profesionales que posees y que son relevantes para el puesto que deseas'
  },
  {
    name: 'Información adicional',
    description: 'Agrega cualquier información relevante que desees destacar y que no encaje en las secciones anteriores'
  }
]
</script>

<template>
  <div class="bg-white rounded-xl max-w-lg shadow-lg">
    <ul class="divide-y text-sm text-zinc-700">
      <ProgressSection v-for="(section, index) in sections" :key="index" :name="section.name" :description="section.description" />
    </ul>
  </div>
</template>
