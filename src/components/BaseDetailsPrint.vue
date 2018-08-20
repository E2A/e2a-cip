<template>
  <details open>
    <summary :class="base.summary">
      <div :class="base.summaryContent">
        <div :class="base.item">
          <slot name="summaryLeft">Add summary here</slot>
        </div>
      </div>
    </summary>
    <div>
      <slot>Add expanded details here</slot>
    </div>
  </details>
</template>

<script>
export default {
  name: 'BaseDetails',
  data () {
    return {
      open: true
    }
  }
}
</script>

<style lang="scss" module="base">
.summary {
  display: block;

  @supports (display: flex) {
    display: flex;
    align-items: center;
  }

}

.summaryContent {
  display: block;
  position: relative;

  @supports (display: flex) {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
  }
}

.item {
  display: inline-block;

  @supports (flex: 1) {
    flex: 1;
  }
}
</style>
