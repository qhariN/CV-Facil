import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const usePersonalInformationStore = defineStore('personalInformation', () => {
  const fullName = ref('')
  const jobTitle = ref('')
  const address = ref('')
  const phoneNumber = ref('')
  const email = ref('')
  const webpages = ref([])

  const personalInformationSection = computed(() => ({
    columns: [
      {
        width: '*',
        columns: [[
          {
            text: fullName.value,
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
          ...webpages.value.map(url => ({
            text: url,
            link: url
          }))
        ]],
        style: 'gray'
      }
    ],
    columnGap: 40
  }))

  function set (data) {
    fullName.value = `${data.name} ${data.surname1} ${data.surname2}`
    jobTitle.value = data.jobTitle
    address.value = `${data.cityName}, ${data.country}`
    phoneNumber.value = data.mobilePhone ?? data.internationalPhone
    email.value = data.email
    webpages.value = data.webpages.map(webpage => webpage.url)
  }

  return { fullName, jobTitle, address, phoneNumber, email, webpages, set, personalInformationSection }
})
