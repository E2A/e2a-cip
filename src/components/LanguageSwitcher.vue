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
  }
}
</script>
