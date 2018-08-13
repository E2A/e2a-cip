<template>
  <tr :class="[type.scaleEpsilon]">
    <td :class="type.bold">{{text}}</td>
    <td :class="type.right">{{budget}} {{getItemValue('setup', 'currencyCode')}}</td>
    <td :class="type.center">{{youthIcon}}</td>
    <td><BaseButtonLink :to="{name: 'activity', params: { activityId: id }}" :label="$t('edit')" /></td>
  </tr>
</template>

<script>
import { dataMethods } from './mixins/dataMethods'
import BaseButtonLink from '@/components/BaseButtonLink'

export default {
  name: 'ActivitiesItemSummary',
  mixins: [dataMethods],
  components: {
    BaseButtonLink
  },
  props: {
    text: {
      type: String,
      required: true
    },
    budget: {
      type: Number,
      default: 0
    },
    youth: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: 1
    }
  },
  computed: {
    youthIcon: function () {
      return this.youth ? 'Yes' : 'No'
    }
  }
}
</script>

<style src="../stylesheets/utilities/type.scss" lang="scss" module="type"></style>
