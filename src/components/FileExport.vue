<template>
  <div class="FileExport">
    <select v-if="this.getItemCount('all') > 0" @change="exportData(exportOption)" v-model="exportOption">
      <option value='' disabled selected>{{$t('fileUpload.selectFormat')}}</option>
      <option value='json'>{{$t('fileUpload.json')}}</option>
      <option value='csv'>{{$t('fileUpload.csv')}}</option>
    </select>
  </div>
</template>

<script>
import { dataIO } from './mixins/dataIO'
import { dataMethods } from './mixins/dataMethods'

export default {
  name: 'FileExport',
  mixins: [dataIO, dataMethods],
  data () {
    return {
      exportOption: ''
    }
  },
  methods: {
    exportData: function (option) {
      console.log(this.runExportData(option))
      if (this.runExportData(option)) {
        this.notify(this.$t('fileUpload.exportSuccessful', {filetype: this.titleCase(option)}), 'success')
      }
    }
  }
}
</script>
