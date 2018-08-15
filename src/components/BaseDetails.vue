<template>
  <div>
    <div :class="base.summary">
      <div :class="base.summaryContent">
        <div :class="base.item">
          <slot name="summaryLeft">Add summary here</slot>
        </div>
        <div :class="base.item">
          <slot name="summaryRight">Add summary here</slot>
        </div>
      </div>
    </div>
    <div>
      <slot>Add expanded details here</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseDetails',
  data () {
    return {
      open: false
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

  // replace with actual icon
  &::before {
    $size: 1rem;
    content: '[+]';
    display: block;
    position: relative;
    font-size: $size;
    line-height: 1;
    width: ($size + 0.5rem);

    [open] & {
      content: '[-]';
    }
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
