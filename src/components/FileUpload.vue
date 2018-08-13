<template>
  <div class="FileUpload">
    <select v-if="(exportType.includes('Export') && this.getItemCount('all') > 0)" @change="runExportData(exportOption)" v-model="exportOption">
      <option value='' disabled selected>{{$t('fileUpload.selectFormat')}}</option>
      <option value='json'>{{$t('fileUpload.json')}}</option>
      <option value='csv'>{{$t('fileUpload.csv')}}</option>
    </select>
    <text-reader v-if="exportType.includes('Import')" @file-read-successful="runImportData($event)"></text-reader>
    <p v-if="importSuccess > 0">{{$t('fileUpload.successImport')}} {{importText}}</p>
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
      importSuccess: false,
      exportOption: '',
      importText: ''
    }
  },
  props: {
    exportType: {
      type: Array,
      default: function () {
        return ['Export', 'Import']
      }
    }
  },
  methods: {
    runImportData: function (fileData) {
      // Parse file data and import, return import type
      const importType = this.parseFileData(fileData)
      const count = this.getItemCount(importType)

      if (count > 0) {
        this.importSuccess = true
        this.$emit('import-success')
      }

      if (importType === 'all' && count > 0) {
        this.importText = `${count} ${this.$tc('item', count)}`
      } else {
        this.importText = `${count} ${importType} ${this.$tc('item', count)}`
      }
    }
  }
}
</script>
