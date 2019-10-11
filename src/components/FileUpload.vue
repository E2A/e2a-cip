<template>
  <div class="">
    <TextReader @file-read-successful="runImportData($event)"></TextReader>
  </div>
</template>

<script>
import TextReader from './TextReader.vue'
import { dataIO } from './mixins/dataIO'
import { dataMethods } from './mixins/dataMethods'

export default {
  name: 'FileUpload',
  mixins: [dataIO, dataMethods],
  components: {
    TextReader
  },
  data () {
    return {
      importText: ''
    }
  },
  methods: {
    runImportData: function (fileData) {
      // Parse file data and import, return import type
      const successful = this.parseFileData(fileData)

      if (successful) {
        this.notify(`${this.$t('fileUpload.successImport')} ${this.importText}`, 'success')
        this.$emit('import-success')
      }
    }
  }
}
</script>
