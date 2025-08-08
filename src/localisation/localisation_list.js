import { ref } from 'vue'
import { useLangStore } from '../store/language_store'
import { pinia } from '../store/pinia-instance'

const langStore = useLangStore(pinia)

const languages = ref([
  {
    label: 'Select language',
    items: [
      {
        label: 'Русский',
        command: () => {
          langStore.toggleLang('ru')
        }
      },
      {
        label: 'English',
        command: () => {
          langStore.toggleLang('en')
        }
      }
    ]
  }
])

export default languages