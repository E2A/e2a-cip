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
        {
          label: 'Fran\u00E7ais', // Français w/unicode escape, so the dangly bit on the c will hopefully render consistently
          value: 'fr'
        },
        {
          label: 'English',
          value: 'en'
        }
      ]
    }
  },
  computed: {
    language: {
      get () {
        return this.langs.filter(locale => locale.value === this.$i18n.locale)[0]
      },
      set (locale) {
        if (locale.value !== this.$i18n.locale) {
          this.$i18n.locale = locale.value
        }
      }
    }
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
