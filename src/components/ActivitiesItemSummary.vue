<template>
  <tr :class="[type.scaleZeta, space.paddingHorizontalBetweenXnarrow]">
    <td :class="[base.cell, base.text]">{{text}}</td>
    <td :class="[base.cell, type.right]">{{budget}} {{getItemValue('setup', 'currencyCode')}}</td>
    <td :class="[base.cell, type.center]">{{youthIcon}}</td>
    <td :class="[base.cell, type.right]">
      <BaseButtonLink
        :to="{name: 'activity', params: { activityId: id }}"
        :label="$t('edit')"
        size="small"
      />
    </td>
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

<style src="styles/type.scss" lang="scss" module="type"></style>
<style src="styles/spacing.scss" lang="scss" module="space"></style>

<style lang="scss" module="base">
.row {
  cellpadding: 0;
  cellspacing: 0;
  border-collapse: collapse;
}

.cell {
  composes: paddingVerticalXnarrow from 'styles/spacing.scss';
  composes: top from 'styles/borders.scss';
  vertical-align: top;
}

.text {
  width: 65%;
}
</style>
