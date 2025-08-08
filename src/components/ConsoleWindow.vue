<template>
    <div :class="isLightTheme ? 'tab light' : 'tab dark'">
     <hitoshi-s-v-g class="hitoshi-svg" />
    </div>
    <div :class="isLightTheme ? 'console-container light' : 'console-container dark'" ref="consoleBox">
        <div class="console-load">
            <console-progress-bar :currentSection="currentSection" />
        </div>

        <transition-group name="response" tag="div">
        <div v-if="history.length != 0" v-for="(event, id) in history" :key="id" style="display: flex; gap: 10px;">
            <div v-if="event.type === 'command'" style="display: flex; gap: 10px;">
            <p>$</p>
            <p
            :style="COMMANDS.some(cmd => cmd === event.content) ? 'color: #c67dfa;' : 'color: #b85a7f;'"
            >{{ event.content }}</p>
          </div>
          <div v-else-if="event.type === 'response' && event.content != 'contact'">
                <p class="console-response" v-for="line in $t(event.content).split('\n')" :key="line">
                    {{ line }}
                </p>
          </div>
          <div v-else-if="event.type === 'response' && event.content === 'contact'">
            <div class="console-response" v-for="line in $t(event.content).split('\n')" :key="line">
                <p>{{ line.split(' : ')[0] }} : <a :href="getLink(line.split(' : ')[0])">{{ line.split(' : ')[1] }}</a></p>
            </div>
          </div>
        </div>
        </transition-group>

        <div class="console-input" @click="focusInput()">
            <p>$</p>
            <input v-model="currentCommand" 
            :style="{ width: `${Math.max(currentCommand.length + 1, 1)}ch`,
                color: validCommand ? '#c67dfa' : '#F8F8FF'
             }"
             @keydown.enter="enterCommand()"
            />
            <span></span>
        </div>
    </div>
</template>

<style scoped>
p, input {
    font-family: 'Fira Code', 'JetBrains Mono', monospace;
}

.console-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    z-index: 9999;
    
    height: 80%;
    width: 50vw;
    backdrop-filter: blur(2px);
    border-radius: 20px;
    align-self: flex-end;
    margin-right: 5%;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 10px;

    overflow: auto;
    overscroll-behavior: contain;

    p {
        font-size: 1.1rem;
        margin: 0;
        margin-bottom: 10px;
    }
    
}

.dark {
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-box-shadow: 0px 0px 30px -7px #F8F8FF;
    -moz-box-shadow: 0px 0px 30px -7px #F8F8FF;
    box-shadow: 0px 0px 30px -7px #F8F8FF;
}

.light {
    background-color: rgba(0, 0, 0, 0.8);
}

.console-input {
        display: flex;
        gap: 10px;

        cursor: text;

        input {
            font-size: 1.1rem;
            background: none;
            border: none;
            outline: none;
            max-width: 100%;
        }

        p {
            margin: 0;
            font-size: 1.1rem;
        }
    }

.console-response {
    text-align: start;
    margin-bottom: 20px;
}

.response-enter-active {
    transition: opacity 0.1s ease, filter 0.2s ease;
}

.response-enter-from {
    opacity: 0;
    filter: blur(4px);
}

.response-enter-to {
    opacity: 1;
    filter: blur(0px);
}

.hitoshi-svg {
    width: 150px;
}

.tab {
    height: 55px;
    margin-left: 100px;
    z-index: 99999;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 20px 20px 0 0;
}

.console-load {
    position: absolute;
    z-index: 9999;
    height: calc(100% - 20px);
    width: calc(100% - 40px);
}
</style>

<script setup lang="js">
import { computed, nextTick, onMounted, ref, toRef, watch } from 'vue';
import { useThemeStore } from '../store/theme_store';
import hitoshiSVG from './hitoshiSVG.vue';
import { animate } from 'animejs';
import consoleProgressBar from './consoleProgressBar.vue';

const props = defineProps({
    currentSection: {
        type: String
    }
})

const currentSection = toRef(props, 'currentSection')

const themeStore = useThemeStore()

const isLightTheme = computed({
  get: () => !themeStore.darkMode
})

const consoleBox = ref()

const firstVisit = ref(true)

const COMMANDS = [
    "whoami",
    "clear",
    "education",
    "projects",
    "contact",
    "hobby",
    "help"
]
const validCommand = ref(false)

const history = ref([])

const currentCommand = ref('')

function enterCommand() {
    const command = currentCommand.value
    currentCommand.value = ''

    history.value.push({
        type: "command",
        content: command
    })

    if (COMMANDS.some(cmd => cmd === command)) {
        switch (command) {
            case "clear":
                history.value = []
                break
            default:
                history.value.push({
                    type: "response",
                    content: command
                })
        }
    }
    else {
        history.value.push({
            type: "response",
            content: "wrongcmd"
        })
    }

    nextTick(() => {
        const box = consoleBox.value
        if (box) box.scrollTop = box.scrollHeight
    })
}

function getLink(title) {
    switch (title.trim()) {
        case "GitHub":
            return "https://github.com/Hitoshi144"
        case "Telegram":
            return "https://t.me/Hitoshi_0"
        case "Mail":
            return "https://e.mail.ru/compose/"
    }
}

function focusInput() {
    const input = document.querySelector('.console-input input')
    input && input.focus()
}

function firstAnimation() {
    animate('.console-input', {
        opacity: [{from: 1}, {to: 0}],
        duration: 1
    })
    animate('.tab', {
        opacity: [{from: 1}, {to: 0}],
        y: [{from: '0%'}, {to: '20%'}],
        duration: 1
    })

    setTimeout(() => {
        animate('.console-load', {
            opacity: [{from: 1}, {to: 0}],
            duration: 300,
            ease: 'out(3)',
        })

        animate('.console-input', {
            opacity: [{from: 0}, {to: 1}],
            ease: 'in(3)',
            delay: 300,
        })

        setTimeout(() => {
            const consoleLoad = document.querySelector('.console-load')
        consoleLoad.style.display = 'none'
        }, 300)

        animate('.tab', {
            opacity: [{from: 0}, {to: 1}],
            y: [{from: '20%'}, {to: '0%'}],
            duration: 800,
            ease: 'in(3)'
        })
    }, 2500)
}

watch(currentSection, async (newSection) => {
    await nextTick()
    const input = document.querySelector('.console-input input')
    if (newSection === '2') {
        if (firstVisit.value === true) {
            firstAnimation()
            firstVisit.value = false
        }
        input && input.focus()
    }
    else {
        input && input.blur()
    }
})

watch(currentCommand, (newCommand) => {
    if (COMMANDS.some(cmd => cmd === newCommand)) {
        validCommand.value = true
    }
    else {
        validCommand.value = false
    }
})
</script>