import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const usePersonalInformationStore = defineStore('personalInformation', () => {
  const firstName = ref('')
  const lastName = ref('')
  const jobTitle = ref('')
  const address = ref('')
  const phoneNumber = ref('')
  const email = ref('')
  const webpages = ref([])

  init()

  const personalInformationSection = computed(() => ({
    columns: [
      {
        width: '*',
        columns: [[
          {
            text: `${firstName.value} ${lastName.value}`,
            style: 'fullName'
          },
          {
            text: jobTitle.value,
            style: 'jobTitle'
          }
        ]]
      },
      {
        width: 'auto',
        columns: [[
          address.value,
          phoneNumber.value,
          email.value,
          ' ',
          ...webpages.value.map(webpage => ({
            text: webpage.url,
            link: webpage.url
          }))
        ]],
        style: 'gray'
      }
    ],
    columnGap: 40
  }))

  const completed = computed(() => firstName.value !== '' && lastName.value !== '' && jobTitle.value !== '' && address.value !== '' && phoneNumber.value !== '' && email.value !== '')

  const completedwebpages = computed(() => webpages.value.length > 0 && webpages.value.every(webpage => webpage.url))

  watch(firstName, () => localStorage.setItem('firstName', firstName.value))
  watch(lastName, () => localStorage.setItem('lastName', lastName.value))
  watch(jobTitle, () => localStorage.setItem('jobTitle', jobTitle.value))
  watch(address, () => localStorage.setItem('address', address.value))
  watch(phoneNumber, () => localStorage.setItem('phoneNumber', phoneNumber.value))
  watch(email, () => localStorage.setItem('email', email.value))
  watch(webpages, (value) => localStorage.setItem('webpages', JSON.stringify(value)), { deep: true })

  function init () {
    firstName.value = localStorage.getItem('firstName') ?? ''
    lastName.value = localStorage.getItem('lastName') ?? ''
    jobTitle.value = localStorage.getItem('jobTitle') ?? ''
    address.value = localStorage.getItem('address') ?? ''
    phoneNumber.value = localStorage.getItem('phoneNumber') ?? ''
    email.value = localStorage.getItem('email') ?? ''
    const storedWebpages = localStorage.getItem('webpages')
    if (!storedWebpages) addWebpage()
    else webpages.value = JSON.parse(storedWebpages)
  }

  function set (data) {
    firstName.value = data.name
    lastName.value = `${data.surname1} ${data.surname2}`
    jobTitle.value = ''
    address.value = `${data.cityName}, ${data.country}`
    phoneNumber.value = data.mobilePhone ?? data.internationalPhone
    email.value = data.email
    if (!data.webpages) return
    webpages.value = data.webpages
  }

  function addWebpage () {
    webpages.value.push({ url: '' })
  }

  function removeWebpage (index) {
    webpages.value.splice(index, 1)
  }

  return { firstName, lastName, jobTitle, address, phoneNumber, email, webpages, completed, completedwebpages, set, addWebpage, removeWebpage, personalInformationSection }
})
