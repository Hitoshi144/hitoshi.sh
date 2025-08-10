<template>
    <Transition name="fade" mode="out-in">
    <div class="certificate-viewer" v-if="choosenCertificate" @click="choosenCertificate = null">
        <img :src="`${baseURL}` + choosenCertificate" class="big-certificate" />
    </div>
    </Transition>

    <div :class="isLightTheme ? 'final-container light' : 'final-container dark'">
        <div class="left-side">
            <span class="final-text">{{ $t('final-message') }}</span>

            <div class="certificates">
                <img v-for="n in 3" :src="`${baseURL}` + $t(`stepik-certificate-${n}`)" class="certificate" @click="choosenCertificate = $t(`stepik-certificate-${n}`)" 
                :style="{opacity: choosenCertificate === $t(`stepik-certificate-${n}`) ? '0' : '1'}"
                />
            </div>
        </div>

        <div class="right-side">
            <div class="contact-line">
                <i class="pi pi-github" />
                <a href="https://github.com/Hitoshi144">Hitoshi144</a>
            </div>
            <div class="contact-line">
                <i class="pi pi-telegram" />
                <a href="https://t.me/Hitoshi_0">@Hitoshi_0</a>
            </div>
            <div class="contact-line">
                <i class="pi pi-at" />
                <a href="https://e.mail.ru/compose/">myshakin2018@mail.ru</a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.final-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100%;
    z-index: 9999;
    overflow: hidden;

    i {
        font-size: 3rem;
    }

    a {
        text-decoration: underline;
        font-size: 2.5rem;
    }
}

.final-text {
    font-size: 2rem;
    font-weight: 600;
    color: white;
    text-align: justify;
}

.left-side {
    max-width: 40%;
    margin-left: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-top: 100px;
}

.certificate {
    width: 300px;
    height: auto;
    border-radius: 10px;
    transition: opacity 0.3s ease;
}

.certificates {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 40px;
    overflow: auto;
    transition: opacity 0.3s ease;
}

.certificate-viewer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
}

.big-certificate {
    width: 60%;
    min-width: 650px;
    height: auto;
    border-radius: 10px;
    transition: opacity 0.3s ease;
}

.right-side {
    display: flex;
    flex-direction: column;
    overflow: auto;
    overflow-x: hidden;
    align-items: flex-start;
    justify-content: center;
    gap: 50px;
    margin-right: 100px;
}

.contact-line {
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
}

.dark {
    .final-text {
        color: #F8F8FF;
    }

    a {
        color: #F8F8FF;
    }

    i {
        color: #F8F8FF;
    }
}

.light {
    .final-text {
        color: black;
    }

    .certificate {
        border: 1px solid black;
    }

    a {
        color: black;
    }

    i {
        color: black;
    }
}
</style>

<script setup lang="js">
import { computed, ref, toRef, watch } from 'vue';
import { useThemeStore } from '../store/theme_store';
import { animate, text, stagger } from 'animejs';

const baseURL = import.meta.env.BASE_URL

const themeStore = useThemeStore()

const isLightTheme = computed(({
  get: () => !themeStore.darkMode
}))

const choosenCertificate = ref()

const props = defineProps({
    currentSection: {
        type: String
    }
})

const currentSection = toRef(props, 'currentSection')
const getReady = ref(false)
const firstPlay = ref(true)

watch(currentSection, (newSection) => {
    const finalText = document.querySelector('.final-text')
    const certificates = document.querySelector('.certificates')
    const contactLines = document.querySelectorAll('.contact-line')
    if (newSection === '3' && firstPlay.value === true) {
        finalText.style.opacity = 0
        certificates.style.opacity = 0
        contactLines.forEach(line => line.style.opacity = 0)

        getReady.value = true
    }
    else if (newSection === '4' && getReady.value === true && firstPlay.value === true) {
        const {chars: finalChars} = text.split(finalText, {chars: {wrap: 'clip'}})

        setTimeout(() => {
            finalText.style.opacity = 100
            certificates.style.opacity = 100
            contactLines.forEach(line => line.style.opacity = 100)

            animate(finalChars, {
            y: [{from: '-200%'}, {to: '0%'}],
            opacity: [{from: 0}, {to: 100}],
            ease: 'in(1)',
            delay: stagger(10, {from: 'random'}),
            duration: 500
        })

        animate(contactLines, {
            x: [{from: '100%'}, {to: '0%'}],
            opacity: [{from: 0}, {to: 1}],
            delay: stagger(300),
            duration: 300,
            ease: 'in(3)'
        })

        }, 300)
        firstPlay.value = false
    }
})
</script>