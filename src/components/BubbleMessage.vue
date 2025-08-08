<template>
    <div :class="`message-position-${messageSide}`" style="transition: all 0.3s ease;">
      <transition name="bubbleAnimation" mode="out-in">
    <div v-if="currentPhrase != ''" :class="isLightTheme ? 'thought light' : 'thought dark'">
        <p :class="isLightTheme ? 'message-text-light' : 'message-text-dark'">
            {{ $t(currentPhrase) }}
        </p>
    </div>
    </transition>
    </div>
</template>

<style scoped>
.bubbleAnimation-enter-from,
.bubbleAnimation-leave-to {
  opacity: 0;
  filter: blur(4px);
}

.bubbleAnimation-enter-to,
.bubbleAnimation-leave-from {
  opacity: 1;
  filter: blur(0);
}

.bubbleAnimation-enter-active,
.bubbleAnimation-leave-active {
  transition: opacity 0.3s ease, filter 0.2s ease;
}

.message-position-1 {
    z-index: -999;
    position: absolute;
    top: 125px;
    left: 0;
}

.message-position-2 {
    z-index: -999;
    position: absolute;
    top: 0px;
    left: 800px;

    .message-text-dark, .message-text-light {
      font-size: 2rem;
    }
}

.message-position-3 {
  z-index: -999;
  position: absolute;
  top: 100px;
  left: 750px;
}

.message-position-4 {
  z-index: -999;
  position: absolute;
  top: 100px;
  left: 850px;
}

.message-text-dark {
    color: black;
    font-size: 1.5rem;
}

.message-text-light {
    color: white;
    font-size: 1.5rem;
}

.light {
  background-color:black;
}

.light:before,
.light:after {
  background-color:black;
}

.light:before {
  box-shadow:-50px 30px 0 -12px black;
}

.light:after {
    box-shadow:40px -34px 0 0 black,
             -28px -6px 0 -2px black,
             -24px 17px 0 -6px black,
             -5px 25px 0 -10px black;
}

.dark {
  background-color:#fff;
}

.dark:before,
.dark:after {
  background-color:#fff;
}

.dark:before {
  box-shadow:-50px 30px 0 -12px #fff;
}

.dark:after {
    box-shadow:40px -34px 0 0 #fff,
             -28px -6px 0 -2px #fff,
             -24px 17px 0 -6px #fff,
             -5px 25px 0 -10px #fff;
}

.thought {
  display:flex;
  padding:20px;
  border-radius:30px;
  min-width:40px;
  max-width:420px;
  min-height:40px;
  margin:20px;
  position:relative;
  align-items:center;
  justify-content:center;
  text-align:center;
}
.thought:before,
.thought:after {
  content:"";
  border-radius:50%;
  display:block;
  position:absolute;
  z-index:-1;
}
.thought:before {
  width:44px;
  height:44px;
  top:-12px;
  left:28px;
}
.thought:after {
  bottom:-10px;
  right:26px;
  width:30px;
  height:30px;
}
</style>

<script setup lang="js">
import { toRef, watch, ref, computed } from 'vue';
import { useThemeStore } from '../store/theme_store';

const messageSide = ref()

const props = defineProps({
    currentSection: {
        type: String
    },
    currentPhrase: {
      type: String
    }
})

const currentSection = toRef(props, 'currentSection')

const currentPhrase = toRef(props, 'currentPhrase')

const themeStore = useThemeStore()

const isLightTheme = computed({
  get: () => !themeStore.darkMode
})

watch((currentSection), (newSection) => {
    messageSide.value = newSection
})
</script>