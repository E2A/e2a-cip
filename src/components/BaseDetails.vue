<template>
  <details>
    <summary>
      <slot name="summary">Add summary here</slot>
    </summary>
    <div>
      <slot name="expanded">Add expanded details here</slot>
    </div>
  </details>
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
