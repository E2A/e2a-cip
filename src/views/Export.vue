<template>
  <!-- Note this will likely never be seen -->
  <BaseBodyText
    :content="$t('fileUpload.exportUrlText')"
  />
</template>

<script>
import BaseBodyText from '@/components/BaseBodyText.vue'
import { dataMethods } from '@/components/mixins/dataMethods'
import { dataIO } from '@/components/mixins/dataIO'

export default {
  name: 'Export',
  mixins: [dataIO, dataMethods],
  components: {
    BaseBodyText
  },
  props: {
    redirect: {
      type: String
    }
  },
  created () {
    // Export data and redirect back to where you came from
    this.runExportData('json')
    this.$router.push({ name: this.redirect })
    this.notify(this.$t('fileUpload.exportSuccessful', { filetype: 'JSON' }), 'success')
  }
}
</script>
