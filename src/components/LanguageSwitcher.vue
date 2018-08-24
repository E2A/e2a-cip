<template>
  <div class="locale-changer">
    <vSelect id="language-select" class="no-clear" v-model="language" :options="langs" :searchable="false"/>
  </div>
</template>

<script>
import vSelect from 'vue-select'
export default {
  name: 'LanguageSwitcher',
  components: {
    vSelect
  },
  data () {
    return {
      langs: [
        {label: 'French', value: 'fr'},
        {label: 'English', value: 'en'}
      ]
    }
  },
  computed: {
    language: {
      get () {
        return this.langs.filter(locale => locale.value === this.$i18n.locale)[0]
      },
      set (locale) {
        const setLocale = locale ? locale.value : 'en'
        this.$i18n.locale = setLocale
      }
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
<style lang="scss">
 #language-select {
  background: white;
 }
  /* Remove clear selection indicator */
 .no-clear {
  button.clear {
    display: none;
  }
 }

</style>
