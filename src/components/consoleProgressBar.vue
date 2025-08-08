<template>
    <div class="progress-container">
        <img src="/src/assets/menhera-chan.gif" style="margin-bottom: 20px;" />
      <ProgressBar :value="value" height="3px" />
    </div>
</template>

<style scoped>
.progress-container {
    margin-top: 10%;

    --p-progressbar-background: black;
    --p-progressbar-height: 13px;
    --p-progressbar-value-background: #F8F8FF;
}
</style>

<script setup lang="js">
import { ProgressBar } from 'primevue';
import { toRef, ref, watch } from 'vue';

const props = defineProps({
    currentSection: {
        type: String
    }
})

const currentSection = toRef(props, 'currentSection')

const value = ref()

watch(currentSection, (newSection) => {
    if (newSection === '2' && value.value !== 100) {
        value.value = 0
        setTimeout(() => value.value = 17, 200)
        setTimeout(() => value.value = 39, 700)
        setTimeout(() => value.value = 54, 1000)
        setTimeout(() => value.value = 69, 1100)
        setTimeout(() => value.value = 88, 1300)
        setTimeout(() => value.value = 100, 1500)
    }
})
</script>