<template>
  <li
    :class="[this.parentIsActive && base.parentActive, this.isCurrentRoute && base.currentRoute, base.navItem, !link.active && base.navItemDisabled, base[getStepProgress]]"
  >
    <router-link
      v-if="link.active"
      :to="{ name: link.name, params: link.params }"
      :class="[base.breadcrumbAnchor]"
      exact
    >
      <span v-if="!hideStep" :class="base.icon">{{stepIndex}}</span>
      {{link.text}}
    </router-link>
    <span
      v-if="!link.active"
      :class="base.breadcrumbAnchorDisabled"
      @click="$emit('dispatchNotficiations')"
    >
    <span v-if="!hideStep" :class="base.icon">{{stepIndex}}</span>
    {{link.text}}</span>
  </li>
</template>

<script>
import BaseIcon from './BaseIcon.vue'

export default {
  name: 'NavItem',
  components: {
    BaseIcon
  },
  props: {
    link: [Object],
    objectIndex: [Number, String],
    hideStep: [Boolean]
  },
  computed: {
    stepIndex: function () {
      if (this.link.steps) {
        return (this.objectIndex + 1).toString()
      }
    },
    isCurrentRoute: function () {
      return this.link.name === this.$route.name
    },
    parentIsActive: function () {
      // make sure there are children
      const fullPath = this.$route.fullPath.substring(1)
      if (this.link.steps) {
        if (this.link.name === this.$route.fullPath) {
          return true
        }

        if (this.link.steps) {
          return this.link.steps.find(link => link.name === this.$route.name)
        }
      }
    },
    getStepProgress: function () {
      const percentMap = {
        50: 'half',
        33: 'third',
        25: 'fourth',
        75: 'threeFourth',
        100: 'whole'
      }

      // get the index of the route in the steps array
      const inArray = this.$props.link.steps.filter(item => item.name === this.$route.name)
      const indexOfStep = this.$props.link.steps.findIndex(item => item.name === this.$route.name)

      if (indexOfStep >= 0) {
      // divide the index by the length
        const per = ((indexOfStep + 1) / this.$props.link.steps.length) * 100
        // return percentage
        return percentMap[per]
      }
      return percentMap[100]
    }
  }
}
</script>

<style lang="scss" module="base">
@import "~styleConfig/spacing";
@import "~styleConfig/color";
@import "~styleConfig/borders";
@import "~styleConfig/breakpoints";

$nav-breakpoint: 81em; // ~1400px

.navItem {
  display: inline-flex;
  position: relative;
  flex-grow: 1;

  &:after,
  &:before {
    content: "";
    transition: 0.2s all ease-in-out;
    background-color: color("primary", $grade: 50);
    position: absolute;
    left: 0;
    right: 0;
    bottom: -7px; // height of bottom border on nav wrapper
    height: border-w('thick');
    z-index: 2;
  }

  &:hover {
    .breadcrumbAnchor {
      color: color("primary");
    }

    .icon {
      background-color: color("primary");
    }

    &:after {
      background-color: color("primary");
    }
  }
}

.navItemDisabled {
  &:after {
    background-color: color("midtone", $grade: 70);
  }
}

.breadcrumbAnchor,
.breadcrumbAnchorDisabled {
  transition: 0.2s ease-in-out;

  &:hover,
  &:active {
    border: none;
  }
}

.breadcrumbAnchor {
  color: color("primary", $grade: 50);
}

.breadcrumbAnchorDisabled {
  color: color("midtone", $grade: 70);

  .icon {
    background-color: color("midtone", $grade: 70);
  }

  .navItem {
    &:after {
      background-color: color("midtone", $grade: 70);
    }
  }
}

.parentActive {
  .icon {
    background-color: color("primary");
  }

  .breadcrumbAnchor {
    color: color("primary");
  }

  &:after {
    background-color: color("primary");
    height: 7px;
  }

  &:before {
    background-color: color("primary");
  }

  &.whole {
    &:after {
      width: 100%;
    }
  }

  &.half {
    &:after {
      width: 50%;
    }
  }
}

.icon {
  background-color: color("primary", $grade: 50);
  padding: 0.25rem 0.45rem;
  border-radius: 50%;
  font-size: 0.75rem;
  margin-right: 0.5rem;
  margin-top: -0.2rem;
  color: color("white");
  transition: 0.2s ease-in-out;
}
</style>
