<div align="center">

# 📜 CV Fácil

Crea tu currículum perfecto con CV Fácil, una app que te permite generar un PDF profesional en minutos. Importa y exporta tus datos a Infojobs de forma rápida y sencilla. Hay confetti si completas tu currículum 😉 🎊

</div>


## Stack

Este proyecto utiliza las siguientes tecnologías:

- [Vercel Serverless Functions](https://vercel.com/docs/serverless-functions/introduction)
- [Vue.js](https://vuejs.org)
- [Vue Router](https://router.vuejs.org)
- [Pinia](https://pinia.esm.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [PdfMake](http://pdfmake.org)
- [Pdf.js](https://mozilla.github.io/pdf.js)

## Variables de entorno para la autenticación con Infojobs

| Variable | Descripción |
| --- | --- |
| SCOPE_NAMES | Nombres de los scopes separados por comas. |
| CALLBACK_URI | URI de redireccionamiento. |
| CLIENT_SECRET | Secreto del cliente. |
| CLIENT_ID | ID del cliente. |

## Desarrollo local

### Instalación

```bash
# Instalar dependencias
$ npm install
```	

### Ejecución

```bash
# Ejecutar servidor de desarrollo (frontend + backend)
$ npm i -g vercel
$ vercel dev
# Ejecutar servidor de desarrollo (solo frontend)
$ npm run dev
```

### Compilación

```bash
# Compilar para producción
$ npm run build
```

### Lint

```bash
# Ejecutar linter
$ npm run lint
```