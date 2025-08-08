
const timeHelper = {
  getCurrentTime() {
      const now = new Date()
      const currentHour = now.getHours()
  
      if (currentHour >= 5 && currentHour <= 11) {
          return "morning"
      }
      else if (currentHour >= 12 && currentHour <= 15) {
          return "daytime"
      }
      else if (currentHour >= 16 && currentHour <= 23) {
          return "evening"
      }
      else {
          return "night"
      }
  },
}

export default timeHelper