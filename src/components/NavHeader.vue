<template>
  <div>
    <header :class="base.wrapper">
      <BaseGutterWrapper
        gutterY="xnarrow"
        gutterX="xnarrow"
      >
        <router-link
          :to="{name: 'home'}"
          :class="base.logo"
          exact
        >
          <img src="@/assets/images/logos/e2a-pathfinder-lockup-reverse.svg" alt="E2A and Pathfinder" />
        </router-link>
        <!-- Initial translation wiring -->
        <LanguageSwitcher />
      </BaseGutterWrapper>

      <!-- nav for small screens -->
      <nav :class="base.smallNav">
        <BaseButtonFlyout
          :label="getCurrentRoute()"
          size="small"
          reverseColors
        >
          <ul :class="base.smallNavList">
            <li
              v-for="(link, key, index) in this.getLinks()"
              :key="`link-${index}`"
            >
              <router-link
                v-if="link.active"
                :to="{
                  name: link.name,
                  params: link.params
                }"
                :class="base.smallNavItem"
                exact
              >
                {{link.text}}
              </router-link>
              <span
                v-if="!link.active"
                :class="base.smallNavDisabled"
                @click="notificationTrigger"
              >
                {{link.text}}
              </span>
            </li>
          </ul>
        </BaseButtonFlyout>
      </nav>

      <!-- nav for large screens -->
      <nav :class="base.largeNav">
        <BaseGutterWrapper
          :class="base.largeNavList"
          el="ul"
          gutterY="xnarrow"
          gutterX="medium"
        >
          <li
            v-for="(link, key, index) in this.getLinks()"
            :key="`link-${index}`"
          >
            <router-link
              v-if="link.active"
              :to="{
                name: link.name,
                params: link.params
              }"
              :class="base.largeNavItem"
              exact
            >
              {{link.text}}
            </router-link>
            <span
              v-if="!link.active"
              :class="base.largeNavDisabled"
              @click="notificationTrigger"
            >
              {{link.text}}
            </span>
            <BaseIcon
              v-if="index !== 0"
              :class="base.largeNavArrow"
              name="arrow-right"
              size="0.6em"
            />
          </li>
        </BaseGutterWrapper>
      </nav>
    </header>

    <div
      v-if="globalNotification('visible')"
      :class="base.notificationWrapper"
    >
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

export default {
  name: 'NavHeader',
  mixins: [dataMethods],
  components: {
    BaseGutterWrapper,
    BaseIcon,
    LanguageSwitcher,
    BaseCalloutBox,
    BaseButtonFlyout
  },
  data: function () {
    return {
      notificationMessage: ''
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
            activityID: 1
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
        return link.name === this.$route.name
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

      if (this.getItemCount('activities') === 0 && (this.getItemCount('setup') === 0 || !this.setupPresent())) {
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

      if (this.getItemCount('activities') > 0 && this.getItemCount('assessments') === 0) {
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

<style lang="scss" module="base">
@import '~styleConfig/spacing';
@import '~styleConfig/color';
@import '~styleConfig/borders';
@import '~styleConfig/breakpoints';

$nav-breakpoint: 81em; // ~1400px

.wrapper {
  composes: paddingHorizontal from 'styles/spacing.scss';
  composes: primaryBg white from 'styles/color.scss';
  @include border('bottom', $w: 'medium', $color: 'primary');

  @supports (display: flex) {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
  }
}

.logo {
  composes: paddingRightNarrow paddingVerticalNarrow from 'styles/spacing.scss';
  border: none !important; // override default anchor underlines
  display: inline-block;
  max-width: 11rem;
  min-width: 5rem;

  &:after {
    content: none !important; // never show active styles
  }
}

.smallNav {
  display: inline-block;
  vertical-align: middle;

  @supports (display: flex) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  @include media('>#{$nav-breakpoint}') {
    display: none;
  }

  // use global style for vue router active class
  :global {
    .router-link-exact-active {
      color: color('primary');

      &:before {
        content: '';
        background-color: color('accent');
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: border-w('thick');
      }
    }
  }
}

.smallNavList {
  composes: paddingVerticalXnarrow from 'styles/spacing.scss';
  padding-left: 0;
}

.smallNavItem {
  composes: leadingTight from 'styles/type.scss';
  padding: space('xnarrow', $split: true) space('narrow');
  color: color('primary');
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
  color: color('primary', $grade: 70);
}

.largeNav {
  display: none;
  text-align: right;
  vertical-align: middle;

  @include media('>#{$nav-breakpoint}') {
    display: inline-block;

    @supports (display: flex) {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
  }

  // use global style for vue router active class
  :global {
    .router-link-exact-active {
      color: color('accent'); // for non-flexbox browsers

      // if flexbox is supported, add a faux-border to the bottom
      // b/c we can reliably stretch menu items to be full height
      @supports (display: flex) {
        color: color('white');

        &:after {
          content: '';
          background-color: color('accent');
          position: absolute;
          left: 0;
          right: 0;
          bottom: -(border-w('medium')); // height of bottom border on nav wrapper
          height: border-w('thick');
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
  composes: scaleZeta from 'styles/type.scss';
  color: color('white');
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
  color: color('primary', $grade: 60);
}

.largeNavArrow {
  color: color('primary', $grade: 40);
  display: block;
  left: -0.25em; // 0.6em/2, subtract a little to optically align
  margin-top: -0.25em; // 0.6em/2, subtract a little to optically align
  position: absolute;
  top: 50%;
}

.notificationWrapper {
  composes: lightBg from 'styles/color.scss';
  composes: bottom from 'styles/borders.scss';
  composes: paddingVerticalXnarrow paddingHorizontalNarrow from 'styles/spacing.scss';
}
</style>
