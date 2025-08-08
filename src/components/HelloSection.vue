<template>
  <background />
  <div :class="isLightTheme ? 'container light' : 'container dark'">
    <div class="content">
      <h2>{{ $t(timeHelper.getCurrentTime()) }} </h2>
        <h1>{{ $t("iam") }}</h1>
      <p>Full-Stack Web Developer</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  z-index: -1;
  transition: all 0.3s ease;
  width: 100%;
  height: 100%;
}

.light {
  background-color: transparent;

  h1, h2, p, .type-indicator {
    color: #000000;
  }
}

.dark {
  background-color: transparent;

  h1, h2, p, .type-indicator {
    color: #F8F8FF;
  }
}

.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 15vw;
  justify-content: center;

  h1, p {
    margin: 0;
  }

  h1 {
    font-size: 8rem;
  }

  p {
    align-self: flex-end;
  }
}

.type-indicator {
  font-size: 5rem;
}
</style>

<script lang="js" setup>
import { computed, nextTick, onMounted } from 'vue';
import timeHelper from '../utils/time'
import { useThemeStore } from '../store/theme_store';
import background from './background.vue';
import { animate, text, stagger } from 'animejs';

const themeStore = useThemeStore()

const isLightTheme = computed({
  get: () => !themeStore.darkMode
})

onMounted(() => {
  const { chars } = text.split('h1', {
    chars: {wrap: 'clip'}
  })

  const { chars: greetingsChars } = text.split('h2', {
    chars: {wrap: 'clip'}
  })

  const { chars: profChars } = text.split('p', {
    chars: {wrap: 'clip'}
  })

  animate(chars, {
    opacity: [{from: 100}, {to: 0}],
    duration: 300,
    ease: 'out(3)'
  })
  animate(greetingsChars, {
    opacity: [{from: 100}, {to: 0}],
    duration: 300,
    ease: 'out(3)'
  })
  animate(profChars, {
    opacity: [{from: 100}, {to: 0}],
    duration: 300,
    ease: 'out(3)'
  })

  setTimeout(() => {
    animate(chars, {
    opacity: [{from: 0}, {to: 100}],
    duration: 1000, 
    ease: 'in(10)',
    delay: stagger(150)
  })

    animate(greetingsChars, {
      ease: 'in(3)',
      opacity: [{from: 80}, {to: 100}],
      y: [{from: '-200%'}, {to: '0%'}],
      delay: stagger(50, {from: 'random'}),
      duration: 2000
    })

    setTimeout(() => {
      animate(profChars, {
        ease: 'in(10)',
        opacity: 100,
        y: [{from: '200%'}, {to: '0%'}],
        delay: stagger(50),
        duration: 1000
      })
    }, 2500)
  }, 1000)

})

</script>