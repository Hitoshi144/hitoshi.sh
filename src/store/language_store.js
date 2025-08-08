import { defineStore } from "pinia";
import { ref } from "vue";

export const useLangStore = defineStore('language', {
    state: () => ({
        currentLanguage: ref(localStorage.getItem('lang') || 'en')
    }),
    actions: {
        toggleLang(lang) {
            this.currentLanguage = lang
            localStorage.setItem('lang', this.currentLanguage)
        },

        getLang() {
            return localStorage.getItem('lang')
        }
    }
})