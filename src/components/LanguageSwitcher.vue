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
