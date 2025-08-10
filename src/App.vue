<template>
  <Transition name="fade" mode="out-in">
  <div v-if="screenWidth < 1320" class="please-pc">
    <i class="pi pi-desktop" style="color: #F8F8FF; font-size: 4rem; margin-bottom: 40px;" />
    <span class="please-text">Пожалуйста, посетите данный сайт на широком экране :)</span>
    <span class="please-text">Please visit this site on a wide screen :)</span>
  </div>
  </Transition>

  <div class="load-stop">
    <ProgressSpinner style="width: 10vw; height: auto;" />
  </div>
  <div v-if="screenWidth >= 1320" class="root-container">
    <div class="container">
      <div :class="`model section-${currentSection}-position`"
      :style="{ transform: `scale(${scaleFactor})`,
        transition: 'all 0.3s ease'
       }"
      >
        <KanadeModel ref="kanadeModel" :current-section="currentSection" :current-phrase="phrase" />
      </div>
    </div>
  </div>

  <div class="header-container">
    <Header></Header>
  </div>

  <div class="sections-wrapper">

    <section class="section"
    data-section="1"
    >
      <HelloSection />
    
    </section>

    <section class="section"
    data-section="2"
    >
    <ConsoleWindow :current-section="currentSection" />

  </section>

    <section class="section"
    data-section="3"
    >
  <ProjectsMenu :currentSection="currentSection" />
  </section>

  <section class="section" style="overflow: hidden;"
  data-section="4"
  >
  <finalSection :currentSection="currentSection" />
</section>

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

.root-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
}

.container {
  width: 100%;
  height: 100%;
  position: relative;
}

.header-container {
  position: fixed;
  width: 100%;
  z-index: 9999999;
}

.model {
  position: fixed;
  z-index: 1;
  pointer-events: none;
}

.section-1-position {
  bottom: -470px;
  right: -400px;
}

.section-2-position {
  bottom: -500px;
  right: calc(100% - 900px);
}

.section-3-position {
  bottom: -600px;
  right: calc(100% - 900px);
}

.section-4-position {
  bottom: -600px;
  right: calc((100% - 1400px) / 2);
}

.sections-wrapper {
  height: 100vh;
  width: 100vw;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;

  scrollbar-width: none;
  -ms-overflow-style: none;
}

.sections-wrapper::-wevbkit-scrollbar {
  display: none;
}

.section {
  height: 100vh;
  scroll-snap-align: start;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  flex-direction: column;
}

.load-stop {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 99999999;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;

  --p-progressspinner-color-one: #F8F8FF;
  --p-progressspinner-color-two: #F8F8FF;
  --p-progressspinner-color-three: #F8F8FF;
  --p-progressspinner-color-four: #F8F8FF;
}

.please-pc {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: black;
  z-index: 99999999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  overflow: hidden;
}

.please-text {
  color: #F8F8FF;
  font-size: 1.25rem;
  margin-left: 10px;
  margin-right: 10px;
}
</style>

<script setup lang="js">
import { ref, onMounted, watch, nextTick, computed, onBeforeUnmount } from 'vue';
import KanadeModel from './components/KanadeModel.vue';
import { useI18n } from 'vue-i18n';
import HelloSection from './components/HelloSection.vue';
import Header from './components/Header.vue';
import { useLangStore } from './store/language_store';
import ConsoleWindow from './components/ConsoleWindow.vue';
import ProjectsMenu from './components/ProjectsMenu.vue';
import { animate } from 'animejs';
import { ProgressSpinner } from 'primevue';
import finalSection from './components/finalSection.vue';

const { locale } = useI18n()
const langStore = useLangStore()
const currentLang = computed(() => langStore.currentLanguage)

const screenWidth = ref(window.innerWidth)

let first_play = {
  1: true,
  2: true,
  3: true,
  4: true
}

const scaleFactor = ref(1)

const phrase = ref('')
const onKanade = ref(false)

const kanadeModel = ref(null)

function kanadeMotion_1_1() {
  setTimeout(() => {
      kanadeModel.value.motion("cool-forward02")
  }, 300)
  setTimeout(() => {
    if (currentSection.value !== '1') return
        phrase.value = "kanade-phrase-1_1"
        kanadeModel.value.motion('first-greetings')
      }, 1500)

      setTimeout(() => {
    if (currentSection.value !== '1') return
        phrase.value = ''
        kanadeModel.value.motion('normal-forward02')
        setTimeout(() => {
            phrase.value = 'kanade-phrase-1_2'
            kanadeModel.value.motion('closeeye03')
        }, 1000)
      }, 6500)
    
      setTimeout(() => {
    if (currentSection.value !== '1') return
        phrase.value = ''
        setTimeout(() => {
          phrase.value = 'kanade-phrase-1_3'
          kanadeModel.value.motion('normal-smile')
        })
      }, 15000)

      setTimeout(() => {
    if (currentSection.value !== '1') return
        phrase.value = ''}, 20000)
}

function kanadeMotion_1_2() {
  phrase.value = ''
  kanadeModel.value.motion('face_smile')
  setTimeout(() => {
    kanadeModel.value.motion('greetings')
  }, 400)
}

function kanadeMotion_1_3() {
  const phrases = ['kanade-phrase-1_4', 'kanade-phrase-1_5', 'kanade-phrase-1_6']
  const choosenPhrase = phrases[Math.floor(Math.random() * phrases.length)]

  switch(choosenPhrase) {
    case 'kanade-phrase-1_4':
      kanadeModel.value.motion('eat_01')
      setTimeout(() => kanadeModel.value.motion('think02'), 300)
      break
    case 'kanade-phrase-1_5':
      kanadeModel.value.motion("smile_14")
      setTimeout(() => kanadeModel.value.motion("nodtilthead0102"), 300)
      break
    case 'kanade-phrase-1_6':
      kanadeModel.value.motion('smile_03')
      setTimeout(() => kanadeModel.value.motion('shakehand01'), 300)
      break
  } 

  phrase.value = choosenPhrase
  setTimeout(() => kanadeMotion_1_2(), 3000)
}

function kanadeMotion_2_1() {
  phrase.value = ''
  setTimeout(() => {
    if (currentSection.value !== '2') return
      kanadeModel.value.motion('face_surprise')
  }, 300)
  setTimeout(() => {
    if (currentSection.value !== '2') return
    phrase.value = 'kanade-phrase-2_1'
    kanadeModel.value.motion("cute-piece")
  }, 500)

  setTimeout(() => {
    if (currentSection.value !== '2') return
    phrase.value = ''
    kanadeModel.value.motion("smile_01")

    setTimeout(() => {
      phrase.value = 'kanade-phrase-2_2'
      kanadeModel.value.motion("cool-forward02")
    }, 500)
    
  }, 4000)

  setTimeout(() => {
    if (currentSection.value !== '2') return
    phrase.value = ''

    setTimeout(() => {
      phrase.value = 'kanade-phrase-2_3'
      kanadeModel.value.motion('posenod02')
    }, 500)
  }, 10000)

  setTimeout(() => {
    if (currentSection.value !== '2') return
    phrase.value = ''
  }, 18500)
}

function kanadeMotion_2_2() {
  setTimeout(() => {
    if (currentSection.value !== '2') return
    phrase.value = ''
    kanadeModel.value.motion('smile_02')

    setTimeout(() => {
      phrase.value = 'kanade-phrase-2_4'
      kanadeModel.value.motion('tilthead0103')
    }, 500)
  }, 300)

  setTimeout(() => {
    if (currentSection.value !== '2') return
    phrase.value = ''
  }, 5000)
}

function kanadeMotion_2_3() {
  const phrases = []
  for (let i = 5; i <= 11; i++) {
    phrases.push(`kanade-phrase-2_${i}`)
  }
  const choosenPhrase = phrases[Math.floor(Math.random() * phrases.length)]

  kanadeModel.value.motion('normal_03')
  setTimeout(() => kanadeModel.value.motion('tilthead05'), 300)

  phrase.value = choosenPhrase
  setTimeout(() => {
    phrase.value = ''
    kanadeModel.value.motion('smile_02')
    setTimeout(() => kanadeModel.value.motion('tilthead0103'), 500)
}, 6000)
}

function kanadeMotion_3_1() {
  if (currentSection.value !== '3') return
  phrase.value = ''

  setTimeout(() => {
    if (currentSection.value !== '3') return
    kanadeModel.value.motion('smile_14')

  }, 300)
  setTimeout(() => {
    if (currentSection.value !== '3') return
    phrase.value = 'kanade-phrase-3_1'
    kanadeModel.value.motion('cheek01')
  }, 600)

  setTimeout(() => {
    if (currentSection.value !== '3') return
    phrase.value = ''

    kanadeModel.value.motion("smile_05")
    setTimeout(() => {
      if (currentSection.value !== '3') return
      phrase.value = 'kanade-phrase-3_2'
      kanadeModel.value.motion('normal-forward02')
    },300)
  }, 3300)

  setTimeout(() => {
    if (currentSection.value !== '3') return
    phrase.value = ''
  }, 8300)
}

function kanadeMotion_3_2() {
  kanadeModel.value.motion('eat_01')
  setTimeout(() => kanadeModel.value.motion('smile_05'), 1000)
}

function handleClick(event) {
  const x = event.pageX
  const y = event.pageY

  const kanadeCoords = document.querySelector('.model').getBoundingClientRect()


  if (
    x >= kanadeCoords.left + kanadeCoords.width * 0.4 &&
    x <= kanadeCoords.right - kanadeCoords.width * 0.4 &&
    y >= kanadeCoords.top + kanadeCoords.height * 0.05 &&
    y <= kanadeCoords.bottom
  ) {
    onKanade.value = true
  }
}

function kanadeMotion_3_3() {
  kanadeModel.value.motion("smile_05")
  setTimeout(() => {
    phrase.value = ''
    kanadeModel.value.motion('normal-forward02')
  },300)
}

function kanadeMotion_4_1() {
  phrase.value = ''

  setTimeout(() => {
    if (currentSection.value !== '4') return

    kanadeModel.value.motion('smile_14')

    setTimeout(() => {
      if (currentSection.value !== '4') return

      phrase.value = 'kanade-phrase-4_1'
      kanadeModel.value.motion('sleep01')

      setTimeout(() => {
        if (currentSection.value !== '4') return

        phrase.value = ''
        setTimeout(() => {
          if (currentSection.value !== '4') return

          phrase.value = 'kanade-phrase-4_2'

          kanadeModel.value.motion("sleepy_01")
          setTimeout(() => {
            if (currentSection.value !== '4') return

            kanadeModel.value.motion('greeting01')
            setTimeout(() => {
              if (currentSection.value !== '4') return

              phrase.value = ''
              kanadeModel.value.motion('closeeye_01')}, 2000)
            }, 300)
          }, 300)
      }, 5000)
    }, 300)
  }, 300)
}

function kanadeMotion_4_2() {
  phrase.value = ''

  setTimeout(() => {
    if (currentSection.value !== '4') return
    kanadeModel.value.motion('sleepy_01')

    setTimeout(() => {
      if (currentSection.value !== '4') return

      kanadeModel.value.motion('yurayura01')

      setTimeout(() => {
        if (currentSection.value !== '4') return
        kanadeModel.value.motion('closeeye_01')
      }, 1500)
    }, 300)
  }, 300)
}

function kanadeMotion_4_3() {
  kanadeModel.value.motion('sleepy_02')

  setTimeout(() => {
    if (currentSection.value !== '4') return

    phrase.value = 'kanade-phrase-4_3'
      kanadeModel.value.motion('yurayura01')

      setTimeout(() => {
        if (currentSection.value !== '4') return

        phrase.value = ''
        kanadeModel.value.motion('closeeye_01')
      }, 2000)
  }, 300)
}

const currentSection = ref(null)

watch(currentSection, (currentsection) => {
  switch (currentsection) {
    case '1':
      scaleFactor.value = 1
      if (first_play["1"] === true) {
        kanadeMotion_1_1()
        first_play["1"] = false
      }
      else kanadeMotion_1_2()
      break
    case '2':
      if (first_play["2"] === true) {
        kanadeMotion_2_1()
        first_play["2"] = false
      }
      else {
        kanadeMotion_2_2()
      }
      scaleFactor.value = 0.7
      break
    case '3':
      if (first_play["3"] === true) {
        kanadeMotion_3_1()
        first_play["3"] = false
      }
      else {
        kanadeMotion_3_3()
      }
      scaleFactor.value = 1.1
      break
    case '4':
      if (first_play["4"] === true) {
        kanadeMotion_4_1()
        first_play["4"] = false
      }
      else {
        kanadeMotion_4_2()
      }
      break
  }
})

watch(currentLang, (newLang) => {
  locale.value = newLang
}, {immediate: true})

watch(onKanade, (kanadeClick) => {
  if (kanadeClick === true && phrase.value === '') {
    switch (currentSection.value) {
      case '1':
        kanadeMotion_1_3()
        break
      case '2':
        kanadeMotion_2_3()
        break
      case '3':
        kanadeMotion_3_2()
        break
      case '4':
        kanadeMotion_4_3()
        break
    }

  }
  onKanade.value = false
})

function updateWidth() {
  screenWidth.value = window.innerWidth
}

onMounted(async () => {
  animate('.load-stop', {
    opacity: [{from: 100}, {to: 0}],
    duration: 1500,
    ease: 'in(3)'
  })

  setTimeout(() => {
    const loadStop = document.querySelector('.load-stop')
    loadStop.style.display = 'none'
  }, 1500)
  
  window.addEventListener('click', handleClick)
  window.addEventListener('resize', updateWidth)

  const sections = document.querySelectorAll('.section')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          currentSection.value = entry.target.getAttribute('data-section')
        }
      })
    },
    {
      threshold: 0.6,
    }
  )

  sections.forEach(section => observer.observe(section))
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClick)
  window.removeEventListener('resize', updateWidth)
})
</script>