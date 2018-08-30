export const buttonStyles = {
  props: {
    label: String,
    size: {
      type: String,
      default: 'default'
    },
    role: {
      type: String,
      default: 'default'
    },
    iconLeft: {
      type: String,
      default: 'none'
    },
    iconRight: {
      type: String,
      default: 'none'
    }
  },
  computed: {
    // note: add the button stylesheet to your component with the module name "button"
    sizeClass: function () {
      return this.size !== 'default' && this.button[this.size]
    },
    roleClass: function () {
      return this.role !== 'default' && this.button[this.role]
    },
    iconClass: function () {
      if (this.iconLeft !== 'none') {
        return this.button.hasIconLeft
      }
      if (this.iconRight !== 'none') {
        return this.button.hasIconRight
      }
    }
  },
  data () {
    return {
      iconSize: '0.6em'
    }
  }
}
