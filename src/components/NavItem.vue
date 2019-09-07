<template>
  <li
    :class="[this.parentIsActive && base.parentActive, this.isCurrentRoute && base.currentRoute, base.navItem]"
  >
    <router-link
      v-if="link.active"
      :to="{ name: link.name, params: link.params }"
      :class="base.breadcrumbAnchor"
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

    <ul v-if="link.steps && link.active" :class="base.subNavList">
      <NavItem
        v-for="(subnav, index) in link.steps"
        :key="`subnav-${index}`"
        :link="subnav"
        :objectIndex="index"
        :class="base.subNavItem"
        hideStep
      />
    </ul>
  </li>
</template>

<script>
import BaseIcon from "./BaseIcon.vue";

export default {
  name: "NavItem",
  components: {
    BaseIcon
  },
  props: {
    link: [Object],
    objectIndex: [Number, String],
    hideStep: [Boolean]
  },
  computed: {
    stepIndex: function() {
      if (this.link.steps) {
        return (this.objectIndex + 1).toString();
      }
    },
    isCurrentRoute: function() {
      return this.link.name === this.$route.name;
    },
    parentIsActive: function() {
      // make sure there are children
      // debugger;
      const fullPath = this.$route.fullPath.substring(1);
      if (this.link.steps) {
        if (this.link.name === this.$route.fullPath) {
          return true;
        }

        if (this.link.steps) {
          return this.link.steps.find(link => link.name === this.$route.name);
        }
      }
    }
  }
};
</script>

<style lang="scss" module="base">
@import "~styleConfig/spacing";
@import "~styleConfig/color";
@import "~styleConfig/borders";
@import "~styleConfig/breakpoints";

$nav-breakpoint: 81em; // ~1400px

.subNavList {
  list-style: none;
  display: none;
  flex: 1;
  align-items: center;

  .navItem {
    font-size: 0.75rem;
  }
}

.navItem {
  display: inline-flex;
  position: relative;
  flex-grow: 1;

  &:after {
    content: "";
    transition: 0.2s all ease-in-out;
    background-color: transparent;
    position: absolute;
    left: 0;
    right: 0;
    bottom: -7px; // height of bottom border on nav wrapper
    height: 6px;
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
}

.parentActive {
  .icon {
    background-color: color("primary");
  }

  .breadcrumbAnchor {
    color: color("primary");
  }

  .subNavList {
    display: inline-flex;
  }

  &:after {
    background-color: color("primary");
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

.subNavItem {
  &:hover {
    &:after {
      background-color: transparent;
    }
  }

  // use global style for vue router active class
  :global {
    .router-link-exact-active {
      color: color('accent');
    }
  }
}
</style>