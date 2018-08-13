export const buttonStyles = {
  props: {
    size: {
      type: String,
      default: 'default'
    },
    role: {
      type: String,
      default: 'default'
    }
  },
  computed: {
    // note: add the button stylesheet to your component with the module name "button"
    sizeClass: function () {
      return this.size !== 'default' && this.button[this.size]
    },
    roleClass: function () {
      return this.role !== 'default' && this.button[this.role]
    }
  }
}
