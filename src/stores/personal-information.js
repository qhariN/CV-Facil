import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const usePersonalInformationStore = defineStore('personalInformation', () => {
  const firstName = ref('')
  const lastName = ref('')
  const jobTitle = ref('')
  const address = ref('')
  const phoneNumber = ref('')
  const email = ref('')
  const webpages = ref([])

  addWebpage()

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

  function set (data) {
    firstName.value = data.name
    lastName.value = `${data.surname1} ${data.surname2}`
    jobTitle.value = data.jobTitle
    address.value = `${data.cityName}, ${data.country}`
    phoneNumber.value = data.mobilePhone ?? data.internationalPhone
    email.value = data.email
    webpages.value = data.webpages
  }

  function addWebpage () {
    webpages.value.push({ url: '' })
  }

  return { firstName, lastName, jobTitle, address, phoneNumber, email, webpages, set, addWebpage, personalInformationSection }
})
