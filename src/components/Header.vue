<template>
  <div :class="isLightTheme ?  'container light' : 'container dark'">
    <div id="theme-switcher" style="display: flex; gap: 20px;">
    <i :class="isLightTheme ? 'pi pi-sun' : 'pi pi-moon'"
    style="font-size: 1.5rem; transition: all 0.3s ease;"
    :style="isLightTheme ? 'color: black;' : 'color: white;'"
    ></i>
    <ToggleSwitch v-model="isLightTheme" />
    </div>
    
    <Button id="lang-btn" rounded type="button" icon="pi pi-language" aria-haspopup="true" aria-controls="overlay_menu"
    @click="toggleMenu"
    />
    <Menu ref="menu" id="overlay_menu"
    :model="languages"
    :popup="true"
    style="margin-top: 10px; background-color: black; z-index: 9999;"
    />
  </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: flex-start;
    gap: 20px;
    align-items: flex-start;
    flex-direction: column;
    margin-left: 10px;
    margin-top: 15px;
    overflow-x:hidden;
    z-index: 999;

}

.dark {
    --p-toggleswitch-width: 50px;
    --p-toggleswitch-background: #F8F8FF;
    --p-toggleswitch-handle-background: black;
    --p-toggleswitch-handle-hover-background: rgb(54, 54, 54);
    --p-toggleswitch-hover-background: rgb(236, 244, 255);

    --p-button-primary-background: #F8F8FF;
    --p-button-primary-border-color: #F8F8FF;
    --p-button-primary-hover-background: rgb(236, 244, 255);
    --p-button-primary-hover-border-color: rgb(236, 244, 255);
    --p-button-primary-active-background: #cadadf;
    --p-button-primary-active-border-color: #cadadf;

}

.light {
    --p-toggleswitch-width: 50px;
    --p-toggleswitch-checked-background: black;
    --p-toggleswitch-hover-background: rgb(236, 244, 255);
    --p-toggleswitch-handle-checked-background: #F8F8FF;
    --p-toggleswitch-handle-checked-hover-background: #c5c5c5;
    --p-toggleswitch-checked-hover-background: rgb(37, 37, 37);

    --p-button-primary-background: black;
    --p-button-primary-border-color: black;
    --p-button-primary-hover-background: rgb(37, 37, 37);
    --p-button-primary-hover-border-color: rgb(37, 37, 37);
    --p-button-primary-active-background: rgb(28, 31, 34);
    --p-button-primary-active-border-color: rgb(28, 31, 34);
    --p-button-primary-color: #F8F8FF;
    --p-button-primary-hover-color: rgb(236, 244, 255);
    --p-button-primary-active-color: #cadadf;
}

</style>

<script setup lang="js">
import ToggleSwitch from 'primevue/toggleswitch'
import { computed, onMounted, ref } from 'vue';
import { useThemeStore } from '../store/theme_store';
import 'primeicons/primeicons.css'
import languages from '../localisation/localisation_list.js'
import { Button, Menu } from 'primevue';
import { animate } from 'animejs';

const themeStore = useThemeStore()

const menu = ref()

const isLightTheme = computed({
  get: () => !themeStore.darkMode,
  set: () => {
    themeStore.toggleTheme()
  }
})

const toggleMenu = (event) => {
  menu.value.toggle(event)
}

onMounted (() => {
  animate('#theme-switcher', {
    y: '-200%',
    duration: 300,
    ease: 'out(3)'
  })
  animate('#lang-btn', {
    y: '-250%',
    duration: 300,
    ease: 'out(3)'
  })

  setTimeout(() => {
    animate('#theme-switcher', {
    ease: 'in(10)',
    y: [{from: '-200%'}, {to: '0%'}],
    duration: 1000,
    delay: 300
  })
    
    animate('#lang-btn', {
      ease: 'in(10)',
      y: [{from: '-250%'}, {to: '0%'}],
      duration: 1000,
    })
  }, 2000)
  
})
</script>