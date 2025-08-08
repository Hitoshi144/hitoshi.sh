import { createI18n } from "vue-i18n";
import en from './en.json'
import ru from './ru.json'

const messages = {
    en,
    ru
}

const i18n = createI18n({
    legacy: false,
    locale: 'ru',
    fallbackLocale: 'ru',
    messages
})

export default i18n