<template>
  <BaseButton
    v-if="getItemCount(clearType[0].toLowerCase()) > 0"
    :label="`${$t('clearItems.clear')} ${$t(`clearItems.${clearType[0]}`)}`"
    @click="clearItems(clearType[0].toLowerCase())"
    size="small"
  />
</template>

<script>
import { dataIO } from './mixins/dataIO'
import { dataMethods } from './mixins/dataMethods'
import BaseButton from './BaseButton'

export default {
  name: 'ClearItems',
  mixins: [dataIO, dataMethods],
  components: {
    BaseButton
  },
  data () {
    return {
      itemsCount: 0,
      deleteSuccess: false,
      removedItemsText: ''
    }
  },
  props: {
    clearType: {
      type: Array,
      required: true,
      default: function () {
        // Default to delete all
        return ['All']
      },
      validator: function (value) {
        // The value must match one of these strings
        const stringCheck = ['Assessments', 'Activities', 'Recommendations', 'All'].includes(value[0])
        const arrayLength = value.length === 1
        return (stringCheck && arrayLength)
      }
    }
  },
  methods: {
    setRemovedItemsText: function (deleteType) {
      // adjust removed text to be more readable
      if (deleteType === 'all') {
        this.removedItemsText = this.$t('successRemovedAll')
      } else {
        this.removedItemsText = deleteType
      }
    },
    clearItems: function (deleteType) {
      const currentItemCount = this.getItemCount(deleteType)

      if (deleteType === 'all') {
        // Delete all items
        this.runExportData('json') // Force export as a backup.
        this.$store.dispatch('entities/deleteAll')
      } else {
        // Delete specific entity type
        this.$store.dispatch(`entities/${deleteType}/deleteAll`)
      }
      // Emit event on success
      if (this.getItemCount(deleteType) === 0) {
        this.setRemovedItemsText(deleteType)
        this.notify(`${this.$t('successRemoved')} ${currentItemCount} ${this.removedItemsText}`, 'warning')
        this.$emit('delete-success')
      }
    }
  }
}
</script>
