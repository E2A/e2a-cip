<template>
  <div class="locale-changer">
    <select v-model="$i18n.locale">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang.key">{{ lang.string }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'LanguageSwitcher',
  data () {
    return {
      langs: [
        {string: 'French', key: 'fr'},
        {string: 'English', key: 'en'}
      ]
    }
  },
  methods: {
    detectLanguage: function () {
      // IE 11 / 10
      var detectedLanguages = []
      if (navigator.browserLanguage) {
        detectedLanguages.push(navigator.browserLanguage)
      }
      if (navigator.userLanguage) {
        detectedLanguages.push(navigator.userLanguage)
      }
      // FF & Chrome
      if (navigator.language) {
        detectedLanguages.push(navigator.language)
      }
      // FF & Chrome
      if (navigator.languages) {
        detectedLanguages.concat(navigator.languages)
      }
      console.log(detectedLanguages)
      console.log(detectedLanguages.includes('en'))
    }
  },
  created () {
    this.detectLanguage()
  }
}
</script>
