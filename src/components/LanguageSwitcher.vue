<template>
  <div class="locale-changer">
    <vSelect id="language-select" class="no-clear" v-model="language" :options="langs" :searchable="false"/>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import locale2 from 'locale2'
import { dataMethods } from '@/components/mixins/dataMethods'

export default {
  name: 'LanguageSwitcher',
  mixins: [dataMethods],
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
      var locale = ''
      // Browser sniff
      if (locale2) {
        locale = locale2
      }

      // Use URL Query for Native App and to allow forced language
      if (this.$route.query.lang) {
        locale = this.$route.query.lang
      }

      if (locale) {
        locale = locale.split('-')[0]
        this.$i18n.locale = locale
      }
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
