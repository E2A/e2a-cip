<template>
  <div :class="base.wrapper">
    <BaseFormSelect
      v-model="language"
      :options="langs"
      :searchable="false"
      name="language-select"
      noClear
    />
  </div>
</template>

<script>
import BaseFormSelect from './BaseFormSelect.vue'
import locale2 from 'locale2'
import { dataMethods } from '@/components/mixins/dataMethods'

export default {
  name: 'LanguageSwitcher',
  mixins: [dataMethods],
  components: {
    BaseFormSelect
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

<style lang="scss" module="base">
.wrapper {
  composes: scaleZeta from 'styles/type.scss';
  display: inline-block;
  max-width: 9rem;
  vertical-align: middle;

  :global {
    .v-select .dropdown-toggle {
      padding: 0 !important;
    }
  }
}
</style>
