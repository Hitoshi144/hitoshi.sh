<template>
    <div id="particles-js-dark" :class="isLightTheme ? 'hidden' : 'visible'">
</div>
<div id="particles-js-light" :class="isLightTheme ? 'visible' : 'hidden'">
</div>
</template>

<style scoped>
html, body{
  height: 100%;
  margin:0px;
  padding: 0px;
}
#particles-js-dark{
  position: fixed;
  width: 100%;
  height: 100%;
  background: #111111;
  z-index: -999;
}

#particles-js-light {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #F8F8FF;
  z-index: -999;
}

.hidden {
    opacity: 0;
    transition: opacity 0.3s ease;
}

.visible {
    opacity: 100;
    transition: opacity 0.3s ease;
}
</style>

<script setup lang="js">
import { onMounted, computed, nextTick } from 'vue';
import { useThemeStore } from '../store/theme_store';

const themeStore = useThemeStore()

const isLightTheme = computed({
  get: () => !themeStore.darkMode
})

onMounted(async () => {

particlesJS("particles-js-light", {
"particles": {
  "number": {
    "value": 100,
    "density": {
      "enable": true,
      "value_area":1000
    }
  },
  "color": {
    "value": ["#000000"]
  },
  
  "shape": {
    "type": "circle",
    "stroke": {
      "width": 0,
      "color": "#fff"
    },
    "polygon": {
      "nb_sides": 5
    },
    "image": {
      "src": "img/github.svg",
      "width": 100,
      "height": 100
    }
  },
  "opacity": {
    "value": 0.6,
    "random": false,
    "anim": {
      "enable": false,
      "speed": 1,
      "opacity_min": 0.1,
      "sync": false
    }
  },
  "size": {
    "value": 1,
    "random": true,
    "anim": {
      "enable": false,
      "speed": 40,
      "size_min": 0.1,
      "sync": false
    }
  },
  "line_linked": {
    "enable": true,
    "distance": 120,
    "color": "#000000",
    "opacity": 0.4,
    "width": 1
  },
},
"interactivity": {
  "detect_on": "canvas",
  "events": {
    "onhover": {
      "enable": true,
      "mode": "grab"
    },
    "onclick": {
      "enable": false
    },
    "resize": true
  },
  "modes": {
    "grab": {
      "distance": 140,
      "line_linked": {
        "opacity": 1
      }
    },
    "bubble": {
      "distance": 400,
      "size": 40,
      "duration": 2,
      "opacity": 8,
      "speed": 3
    },
    "repulse": {
      "distance": 200,
      "duration": 0.4
    },
    "push": {
      "particles_nb": 4
    },
    "remove": {
      "particles_nb": 2
    }
  }
},
"retina_detect": true
});

particlesJS("particles-js-dark", {
"particles": {
  "number": {
    "value": 100,
    "density": {
      "enable": true,
      "value_area":1000
    }
  },
  "color": {
    "value": ["#F8F8FF"]
  },
  
  "shape": {
    "type": "circle",
    "stroke": {
      "width": 0,
      "color": "#F8F8FF"
    },
    "polygon": {
      "nb_sides": 5
    },
    "image": {
      "src": "img/github.svg",
      "width": 100,
      "height": 100
    }
  },
  "opacity": {
    "value": 0.6,
    "random": false,
    "anim": {
      "enable": false,
      "speed": 1,
      "opacity_min": 0.1,
      "sync": false
    }
  },
  "size": {
    "value": 1,
    "random": true,
    "anim": {
      "enable": false,
      "speed": 40,
      "size_min": 0.1,
      "sync": false
    }
  },
  "line_linked": {
    "enable": true,
    "distance": 120,
    "color": "#F8F8FF",
    "opacity": 0.4,
    "width": 1
  },
},
"interactivity": {
  "detect_on": "canvas",
  "events": {
    "onhover": {
      "enable": true,
      "mode": "grab"
    },
    "onclick": {
      "enable": false
    },
    "resize": true
  },
  "modes": {
    "grab": {
      "distance": 140,
      "line_linked": {
        "opacity": 1
      }
    },
    "bubble": {
      "distance": 400,
      "size": 40,
      "duration": 2,
      "opacity": 8,
      "speed": 3
    },
    "repulse": {
      "distance": 200,
      "duration": 0.4
    },
    "push": {
      "particles_nb": 4
    },
    "remove": {
      "particles_nb": 2
    }
  }
},
"retina_detect": true
});

})
</script>