<template>
  <transition name="selection-transition" mode="out-in">
      <div v-if="!currentProject" :class="isLightTheme ? 'menu-container-light' : 'menu-container-dark'">
        <div class="project-shape" v-for="project in projects" :key="project.title" @click="currentProject = project">
            <div class="img-container" @mouseenter="animateStackIn()">
        <img class="project-img" :src="project.image"/>
        <div class="img-text" @hover="animateStack()">
          <p v-for="tech in project.stack" :key="tech" class="stack-title">
            {{ tech }}
          </p>
        </div>
      </div>
      <p class="menu-title">{{ project.title }}</p>
        </div>
    </div>


    <div :class="isLightTheme ? 'selected-project-container light' : 'selected-project-container dark'" v-else>
      <div class="description-side">
        <div style="display: flex; flex-direction: row; align-self: flex-start; gap: 30px; align-items: center;">
          <Button variant="outlined" severity="contrast" icon="pi pi-chevron-left" :style="isLightTheme ? 'color: black;' : 'color: white;'" style="width: 40px; height: 40px; border-radius: 20%;" @click="currentProject = null" />
          <span class="current-project-title">{{ currentProject.title }}</span>
          <img class="lang-logo" :src="'/src/assets/' + currentProject.lang + '.png'" />
        </div>
        <span class="current-project-description">{{ $t(currentProject.description) }}</span>
      </div>

      <div class="video-side">
        <iframe class="video-player" :src="currentProject.title === 'hitoshi.sh' ? currentProject.video : $t(currentProject.video)" allowfullscreen frameborder="0"/>

        <div class="stack_container">
          <div v-for="tech in currentProject.stack" class="tech_panel">
            <img class="tech_logo" :src="getLogo(tech)" />
            <span class="tech_title">{{ tech }}</span>
          </div>
        </div>

        <a class="github-link" :href="currentProject.github">{{ currentProject.github }}</a>
      </div>
    </div> 
  </transition>
</template>

<style scoped>
.menu-container-light {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* максимум 2 колонки */
    gap: 20px;
    padding: 20px;
    align-self: flex-end;
    margin-right: 100px;
    width: 50%;
    height: 80%;
    justify-content: center;
    z-index: 9999;
    overflow: auto;

    .menu-title {
    margin: 0;
    color: black;
    transition: all 0.3s ease;
}

.project-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.img-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 15px;
}

.img-text {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  text-align: center;
  padding: 10px;
  flex-direction: column;
  flex-wrap: wrap;
}

.img-container:hover .img-text {
  opacity: 1;
}

.project-shape {
  height: fit-content;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.4);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.25);
backdrop-filter: blur(1px);
-webkit-backdrop-filter: blur(1px);
  transition: all 0.3s ease;
}
}

.menu-container-dark {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* максимум 2 колонки */
    gap: 20px;
    padding: 20px;
    align-self: flex-end;
    margin-right: 100px;
    width: 50%;
    height: 80%;
    justify-content: center;
    z-index: 9999;
    overflow: auto;

    .menu-title {
    margin: 0;
    color: #F8F8FF;
    transition: all 0.3s ease;
}

.project-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.img-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 15px;
}

.img-text {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: #F8F8FF;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  text-align: center;
  padding: 10px;
  flex-direction: column;
  flex-wrap: wrap;
}

.img-container:hover .img-text {
  opacity: 1;
}

.project-shape {
  height: fit-content;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.2);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(255, 255, 255, 0.1);
backdrop-filter: blur(5px);
-webkit-backdrop-filter: blur(5px);
  transition: all 0.3s ease;
}
}

.stack-title {
  font-family: 'Negotiate Free', sans-serif;
  font-size: clamp(20px, 1.5vw, 232px);;
}

.project-shape {
  cursor: pointer;
}

.selection-transition-enter-active,
.selection-transition-leave-active {
  transition: opacity 0.3s ease, width 0.2s ease, transform 0.3s ease, filter 0.2s ease;
}

.selection-transition-enter-from,
.selection-transition-leave-to {
  opacity: 0;
  width: 50%;
  transform: translateX(200px);
  filter: blur(10px);
}

.selected-project-container {
  display: flex;
  flex-direction: row;
  width: 65%;
  height: 80%;
  border-radius: 20px;
  align-self: flex-end;
  margin-right: 100px;
  z-index: 9999;
  overflow: auto;
  padding-left: 10px;
}

.dark {
  background-color: rgba(0, 0, 0, 0.8);
  -webkit-box-shadow: 0px 0px 55px 51px rgba(0, 0, 0, 0.8);
-moz-box-shadow: 0px 0px 55px 51px rgba(0, 0, 0, 0.8);
box-shadow: 0px 0px 55px 51px rgba(0, 0, 0, 0.8);

  .tech_panel {
    background-color: #464650;
  }

  .github-link {
    color: #F8F8FF;
  }
}

.light {
  background-color: rgba(248, 248, 255, 0.8);
  -webkit-box-shadow: 0px 0px 55px 51px rgba(248, 248, 255, 0.8);
-moz-box-shadow: 0px 0px 55px 51px rgba(248, 248, 255, 0.8);
box-shadow: 0px 0px 55px 51px rgba(248, 248, 255, 0.8);

.current-project-title, .current-project-description, .github-link, .tech_title {
  color: black;

  
}
.tech_panel {
    background-color: #dcdce2;
  }
}

.description-side {
  display: flex;
  flex-direction: column;
  width: 45%;
  gap: 40px;
}

.video-side {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-left: 2%;
  margin-right: 3%;
  margin-top: 110px;
}

.video-player {
  aspect-ratio: 16 / 9;
  border-radius: 20px;
}

.current-project-title {
  font-size: 3rem;
}

.current-project-description {
  font-size: 1.4rem;
  text-align: justify;
}

.tech_title {
  font-size: 1.25rem;
}

.tech_logo {
  border-radius: 100%;
  width: 40px;
}

.tech_panel {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  border-radius: 30px;
  padding-right: 20px;
  padding-left: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
}

.stack_container {
  display: flex;
  flex-direction: row;
  gap: 30px;
  flex-wrap: wrap;
  margin-top: 20px;
}

.github-link {
  font-size: 1.5rem;
  margin-top: 40px;
  text-decoration: underline;
  align-self: flex-start;
} 

.lang-logo {
  width: 50px;
  height: auto;
  border-radius: 10px;
}
</style>

<script setup lang="js">
import { title } from '@primeuix/themes/aura/card'
import { useThemeStore } from '../store/theme_store'
import { computed, nextTick, ref, toRef, watch } from 'vue'
import { image } from '@primeuix/themes/aura/chip'
import { animate, text, stagger } from 'animejs'
import { Button } from 'primevue'

const themeStore = useThemeStore()

const isLightTheme = computed({
  get: () => !themeStore.darkMode
})

const currentProject = ref()

const props = defineProps({
  currentSection: {
    type: String
  }
})

const currentSection = toRef(props, 'currentSection')
const firstPlay = ref(true)
const getReady = ref(false)

function animateStackIn() {
  const elements = document.querySelectorAll('.stack-title');

  elements.forEach(el => {
    if (!el.dataset.original) {
      el.dataset.original = el.textContent;
    }

    el.innerHTML = el.dataset.original;

    const { words, chars } = text.split(el, {
      words: { wrap: 'clip' },
      chars: true,
    });

    animate(words, {
      y: [
        { to: ['100%', '0%'] },
      ],
      duration: 450,
      delay: stagger(100),
      easing: 'out(3)',
    });

    animate(chars, {
      opacity: [0, 1],
      delay: stagger(20),
      duration: 300,
      easing: 'easeOutExpo',
    });
  });
}

const projects = [
    {
        title: 'ITrialto',
        description: 'itrialto-description',
        image: 'src/assets/itrialto_logo.png',
        video: 'itrialto-link',
        lang: 'TypeScript',
        stack: ['Vue JS', 'Nest JS', 'TypeORM', 'postgreSQL', 'Pinia', 'Axios'],
        github: 'https://github.com/Hitoshi144/ITrialto'
    },
    {
        title: 'My rating URFU',
        description: 'urfu_ddos-description',
        image: 'src/assets/my_rating_urfu_logo.png',
        video: 'urfu_ddos-link',
        lang: 'Python',
        stack: ['aiogram', 'SQLAlchemy', 'asyncio', 'aiohttp'],
        github: 'https://github.com/Hitoshi144/urfu_ddos_bot'
    },
    {
      title: 'hitoshi.sh',
      description: 'hitoshi.sh-description',
      image: 'src/assets/hitoshi.sh_logo.png',
      video: 'https://www.youtube.com/embed/CkKCY_pCPi8?si=Z8yLmtA6831bRlma',
      lang: 'JavaScript',
      stack: ['Vue JS', 'Pinia', 'Anime JS', 'Live2D', 'PrimeVue'],
      github: 'None'
    },
]

function getLogo(name) {
  const validName = 'src/assets/' + name.split(' ').join('').toLowerCase() + '_logo.png'
  return validName
}

function animateProjects() {
  const projects = document.querySelectorAll('.project-shape')

  setTimeout(() => {
    animate(projects, {
    opacity: [{from: 0}, {to: 1}],
    y: [{from: '100%'}, {to: '0%'}],
    duration: 500,
    delay: stagger(300),
    ease: 'in(3)'
  })
  }, 200)
}

function hideProjects() {
  const projects = document.querySelectorAll('.project-shape')
  projects.forEach(project => {
    project.style.opacity = 0
  })
}

watch(currentSection, (newSection) => {
  if ((newSection === '2' || newSection === '4') && firstPlay.value === true) {
    hideProjects()
    getReady.value = true
  }
  else if (newSection === '3' && firstPlay.value === true && getReady.value === true) {
    animateProjects()
    firstPlay.value = false
  }
})
</script>