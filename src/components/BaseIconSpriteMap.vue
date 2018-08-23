<template>
  <div style="display: none;" v-html="sprites">
  </div>
</template>

<script>
import spriteSource from '@/assets/images/spritemap.svg?inline'

export default {
  name: 'BaseIconSpriteMap',
  data () {
    return {
      sprites: spriteSource
    }
  }
}
</script>
