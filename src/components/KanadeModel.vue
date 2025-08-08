<template>
  <bubble-message :current-section="currentSection" :current-phrase="currentPhrase" />
  <canvas ref="canvas"></canvas>
</template>

<style scoped>
</style>

<script setup lang="js">
import * as PIXI from 'pixi.js'
import { Live2DModel, MotionPriority, MotionPreloadStrategy } from 'pixi-live2d-display';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import BubbleMessage from './BubbleMessage.vue';
import { toRef } from 'vue';

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

window.PIXI = PIXI

const canvas = ref(null)
const app = ref(null)
const model = ref(null)

function motion(name) {
  model.value.internalModel.motionManager.stopAllMotions();

  switch (name) {
    case 'first-greetings':
      model.value.motion("greeting_with_smile")
      break
    case 'greetings':
      model.value.motion('w-normal-lookleft02', undefined, MotionPriority.FORCE)
      break
    case 'normal-smile':
      model.value.motion("face_smile_04")
      break
    case 'cute-piece':
      model.value.motion("w-cute-piece01", undefined, MotionPriority.NORMAL)
    case 'face_surprise':
      model.value.motion("face_surprise_03")
    case 'face_smile':
      model.value.motion("face_breath_01")
    case 'normal-forward02':
      model.value.motion("w-normal-forward02")
    case 'closeeye03':
      model.value.motion("face_closeeye_03")
    case 'cool-forward02':
      model.value.motion("w-cool-forward02")
    case 'posenod02':
      model.value.motion("w-normal-shy01")
    case 'smile_01':
      model.value.motion("face_smile_01")
    case 'tilthead0103':
      model.value.motion("w-normal-tilthead0103")
    case 'smile_02':
      model.value.motion("face_smile_02")
    case 'think02':
      model.value.motion("w-adult-think02")
    case 'eat_01':
      model.value.motion("face_eat_01")
    case 'nodtilthead0102':
      model.value.motion("w-cool-nodtilthead0102")
    case 'smile_14':
      model.value.motion("face_smile_14")
    case 'smile_03':
      model.value.motion("face_smile_03")
    case 'shakehand01':
      model.value.motion("w-cool-shakehand01")
    case 'tilthead05':
      model.value.motion("w-cute-tilthead05")
    case 'normal_03':
      model.value.motion("face_normal_03")
    case 'cheek01':
      model.value.motion("w-luka-cheek01")
    case 'smile_05':
      model.value.motion("face_smile_05")
    case 'sleep01':
      model.value.motion("w-cute-sleep01")
    case 'greeting01':
      model.value.motion("w-normal-greeting01")
    case 'closeeye_01':
      model.value.motion("face_closeeye_01")
    case 'sleepy_01':
      model.value.motion("face_sleepy_01")
    case 'yurayura01':
      model.value.motion("w-normal-yurayura01")
    case 'sleepy_02':
      model.value.motion("face_sleepy_02")
    default:
      model.value.motion("w-normal-shakehead05")
      break
  }

}

onMounted(async () => {
  app.value = new PIXI.Application({
    view: canvas.value,
    width: 1300,
    height: 1500,
    autoDensity: true,
    antialias: true,
    resolution: window.devicePixelRatio,
    backgroundAlpha: 0,
  })
  model.value = await Live2DModel.from('/17kanade_unit_3.0_t08/17kanade_unit_3.0_t08.model3.json')
  app.value.stage.addChild(model.value)
  model.value.position.set(app.value.renderer.width / 2, app.value.renderer.height / 2)
  model.value.anchor.set(0.5, 0.5)
  model.value.scale.set(0.5)
})
  
  defineExpose({
      motion,
})
</script>