<template>
  <div v-if="this.$route.name !== 'export'">
    <header :class="base.wrapper">
      <BaseGutterWrapper :class="base.leftPane" gutterY="xnarrow" gutterX="xnarrow">
        <router-link :to="{name: 'home'}" :class="base.logo" exact>
          <img src="@/assets/images/logos/e2a-pathfinder-lockup-reverse.svg" alt="E2A and Pathfinder"/>
          <BaseHeading :level="5" :centered="false" weight="bold" :color="'light'">TARP</BaseHeading>
        </router-link>
      </BaseGutterWrapper>

      <BaseGutterWrapper :class="base.rightPane" gutterY="xnarrow" gutterX="xnarrow">
        <!-- Language selector -->
        <LanguageSwitcher :class="space.marginRightXnarrow"/>
        <BaseGutterWrapper gutterX="xnarrow">
        <BaseButtonLink
          :to="this.$t('nav.userGuidePDF')"
          :router="false" role="default"
          :label="this.$t('nav.userGuide')"
          size="small"
          :target="this.checkElectron() ? '_self' : '_blank'"
          reverseColors
        />
        </BaseGutterWrapper>
        <BaseGutterWrapper :class="[space.marginLeftNarrow]" gutterX="xnarrow" gutterY="xnarrow">
        <BaseButtonLink
          :to="this.$t('nav.eipPdf')"
          :router="false" role="default"
          :label="this.$t('nav.learnMore')"
          size="small"
          :target="this.checkElectron() ? '_self' : '_blank'"
          reverseColors
        /></BaseGutterWrapper>
      </BaseGutterWrapper>
    </header>

    <div v-if="globalNotification('visible')" :class="base.notificationWrapper">
      <BaseCalloutBox
        :key="this.getItemCount('globalnotifications')"
        :message="globalNotification('message')"
        :role="globalNotification('role')"
        :timeout="globalNotification('timeout')"
        dismissable
        shadow
      />
    </div>
  </div>
</template>

<script>
import { dataMethods } from './mixins/dataMethods'
import BaseGutterWrapper from './BaseGutterWrapper.vue'
import BaseIcon from './BaseIcon.vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import BaseCalloutBox from '@/components/BaseCalloutBox.vue'
import BaseButtonFlyout from '@/components/BaseButtonFlyout.vue'
import BaseButtonLink from '@/components/BaseButtonLink.vue'
import BaseHeading from '@/components/BaseHeading.vue'

export default {
  name: 'NavHeader',
  mixins: [dataMethods],
  components: {
    BaseGutterWrapper,
    BaseIcon,
    LanguageSwitcher,
    BaseCalloutBox,
    BaseButtonFlyout,
    BaseButtonLink,
    BaseHeading
  },
  data: function () {
    return {
      notificationMessage: '',
      flyoutOpen: false,
      electron: this.checkElectron()
    }
  },
  computed: {
    links: function () {
      return {
        setup: {
          name: 'setup',
          text: this.$t('nav.setup'),
          active: true
        },
        activities: {
          name: 'activity',
          params: {
            activityId: '1'
          },
          text: this.$t('nav.activities'),
          active: true
        },
        summary: {
          name: 'summary',
          text: this.$t('nav.summary'),
          active: true
        },
        bestPractices: {
          name: 'evidence-informed-practices',
          childName: 'evidence-informed-practice',
          text: this.$t('nav.bestPractices'),
          active: true
        },
        assessment: {
          name: 'assessment',
          text: this.$t('nav.assessment'),
          active: true
        },
        results: {
          name: 'results',
          text: this.$t('nav.results'),
          active: false
        },
        advocate: {
          name: 'advocate',
          childName: 'print',
          text: this.$t('nav.advocate'),
          active: false
        }
      }
    }
  },
  methods: {
    getCurrentRoute: function () {
      // get the (translated) name of the current route
      return Object.values(this.links).find(link => {
        return (
          link.name === this.$route.name || link.childName === this.$route.name
        )
      }).text
    },
    globalNotification: function (value) {
      const notification = this.$store.getters['entities/globalnotifications/query']().first()
      return notification ? notification[value] : false
    },
    getLinks: function () {
      this.updateActiveLinks()
      return this.links
    },
    closeNavFlyout: function (event) {
      this.flyoutOpen = false
    },
    openNavFlyout: function (event) {
      this.flyoutOpen = true
    },
    notificationTrigger: function () {
      this.notify(this.notificationMessage, 'info', 3000)
    },
    updateActiveLinks: function () {
      if (this.getItemCount('assessments') > 0) {
        this.notificationMessage = this.$t('nav.removeAssessment')
        this.links.activities.active = false
        this.links.summary.active = false
        this.links.results.active = true
        this.links.advocate.active = true
      }

      if (
        this.getItemCount('activities') === 0 &&
        (this.getItemCount('setup') === 0 || !this.setupPresent())
      ) {
        this.notificationMessage = this.$t('nav.addSetup')
        this.links.activities.active = false
        this.links.summary.active = false
        this.links.results.active = false
        this.links.advocate.active = false
        this.links.bestPractices.active = false
        this.links.assessment.active = false
      }

      if (this.getItemCount('activities') === 0 && this.setupPresent()) {
        this.notificationMessage = this.$t('nav.addActivites')
        this.links.activities.active = true
        this.links.summary.active = false
        this.links.results.active = false
        this.links.advocate.active = false
        this.links.bestPractices.active = false
        this.links.assessment.active = false
      }

      if (
        this.getItemCount('activities') > 0 &&
        this.getItemCount('assessments') === 0
      ) {
        this.notificationMessage = this.$t('nav.addAssessment')
        this.links.activities.active = true
        this.links.summary.active = true
        this.links.assessment.active = true
        this.links.bestPractices.active = true
        this.links.results.active = false
        this.links.advocate.active = false
      }
    }
  }
}
</script>
<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style lang="scss" module="base">
@import "~styleConfig/spacing";
@import "~styleConfig/color";
@import "~styleConfig/borders";
@import "~styleConfig/breakpoints";

$nav-breakpoint: 81em; // ~1400px

.wrapper {
  composes: paddingHorizontal from "styles/spacing.scss";
  composes: primaryBg white from "styles/color.scss";
  @include border("bottom", $w: "medium", $color: "primary");

  display: flex;
  justify-content: space-between;
  align-items: stretch;
  height: 69px;

  @media print {
    display: none;
  }
}

.leftPane {
  composes: inlineBlock from "styles/display.scss";
  width: 50%;
  flex: 1;
}

.rightPane {
  width: 50%;
  flex: 1;

  align-items: center;
  justify-content: flex-end;
  display: inline-flex;
}

.logo {
  composes: paddingRightNarrow paddingVerticalNarrow from "styles/spacing.scss";
  border: none !important; // override default anchor underlines
  display: inline-flex;
  align-items: center;
  max-width: 11rem;
  color: color('white');

  &:after {
    content: none !important; // never show active styles
  }

  // for IE
  > img[src$=".svg"] {
    width: 55px;
   height: 37px;
  }
}

.smallNav {
  display: inline-block;
  text-align: right;
  vertical-align: middle;
  width: 50%;

  @supports (display: flex) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    width: auto;
  }

  @include media(">#{$nav-breakpoint}") {
    display: none;
  }

  // use global style for vue router active class
  :global {
    .router-link-exact-active {
      color: color("primary");

      &:before {
        content: "";
        background-color: color("accent");
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: border-w("thick");
      }
    }
  }
}

.smallNavList {
  composes: paddingVerticalXnarrow from "styles/spacing.scss";
  padding-left: 0;
}

.smallNavItem {
  composes: leadingTight from "styles/type.scss";
  padding: space("xnarrow", $split: true) space("narrow");
  color: color("primary");
  display: block;
  text-decoration: none;
  position: relative;
  text-align: left;

  &:hover,
  &:active {
    border: none; // override base anchor styles
  }
}

.smallNavDisabled {
  composes: smallNavItem;
  color: color("primary", $grade: 70);
}

.largeNav {
  display: none;
  text-align: right;
  vertical-align: middle;

  @include media(">#{$nav-breakpoint}") {
    display: inline-block;

    @supports (display: flex) {
      display: flex;
      flex-direction: column;
    }
  }

  // use global style for vue router active class
  :global {
    .router-link-exact-active {
      color: color("accent"); // for non-flexbox browsers

      // if flexbox is supported, add a faux-border to the bottom
      // b/c we can reliably stretch menu items to be full height
      @supports (display: flex) {
        color: color("white");

        &:after {
          content: "";
          background-color: color("accent");
          position: absolute;
          left: 0;
          right: 0;
          bottom: -(border-w("medium")); // height of bottom border on nav wrapper
          height: border-w("thick");
        }
      }
    }
  }
}

.largeNavList {
  display: inline-block;
  list-style: none;

  @supports (display: flex) {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-item: stretch;
  }

  > li {
    display: inline-block;
    position: relative;

    @supports (display: flex) {
      display: flex;
      flex-direction: column;
    }
  }
}

.largeNavItem {
  composes: scaleZeta from "styles/type.scss";
  color: color("white");
  display: inline-block;
  position: relative;
  text-decoration: none;

  @supports (display: flex) {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
  }

  &:hover,
  &:active {
    border: none; // override base anchor styles
  }
}

.largeNavDisabled {
  composes: largeNavItem;
  color: color("primary", $grade: 60);
}

.largeNavArrow {
  color: color("primary", $grade: 40);
  display: block;
  left: -0.25em; // 0.6em/2, subtract a little to optically align
  margin-top: -0.25em; // 0.6em/2, subtract a little to optically align
  position: absolute;
  top: 50%;
}

.notificationWrapper {
  composes: lightBg from "styles/color.scss";
  composes: bottom from "styles/borders.scss";
  composes: paddingVerticalXnarrow paddingHorizontalNarrow from "styles/spacing.scss";
}
</style>
