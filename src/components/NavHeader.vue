<template>
  <div>
    <header :class="base.wrapper">
      <router-link
        :to="{name: 'home'}"
        :class="base.logo"
        exact
      >
        <img src="@/assets/images/logos/e2a-pathfinder-lockup-reverse.svg" alt="E2A and Pathfinder" />
      </router-link>
      <!-- Initial translation wiring -->
      <!-- <LanguageSwitcher /> -->
      <nav :class="base.menu">
        <BaseGutterWrapper
          :class="menu.list"
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
              :to="link.url"
              :class="menu.item"
              exact
            >
              {{link.text}}
            </router-link>
            <span
              v-if="!link.active"
              :class="menu.disabled"
              @click="notificationTrigger"
            >
              {{link.text}}
            </span>
            <BaseIcon
              v-if="index !== 0"
              :class="menu.arrow"
              name="arrow-right"
              size="0.6em"
            />
          </li>
        </BaseGutterWrapper>
      </nav>
    </header>

    <BaseCalloutBox
      v-if="globalNotification('visible')"
      :message="globalNotification('message')"
      :role="globalNotification('role')"
      :timeout="globalNotification('timeout')"
      dismissable
    />
  </div>
</template>

<script>
import { dataMethods } from './mixins/dataMethods'
import BaseGutterWrapper from './BaseGutterWrapper.vue'
import BaseIcon from './BaseIcon.vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import BaseCalloutBox from '@/components/BaseCalloutBox.vue'

export default {
  name: 'NavHeader',
  mixins: [dataMethods],
  components: {
    BaseGutterWrapper,
    BaseIcon,
    LanguageSwitcher,
    BaseCalloutBox
  },
  data: function () {
    return {
      notificationMessage: '',
      links: {
        setup: {
          url: '/setup',
          text: 'Setup',
          active: true
        },
        // Ideally, this link should point to /activity/1 if there are no activities
        // But if you've already entered activities, it should go to summary
        // Therefore we don't need summary in the header
        activities: {
          url: '/activity/1',
          text: this.$t('nav.activities'),
          active: true
        },
        summary: {
          url: '/summary',
          text: this.$t('nav.summary'),
          active: true
        },
        bestPractices: {
          url: '/evidence-informed-practices',
          text: this.$t('nav.bestPractices'),
          active: true
        },
        assessment: {
          url: '/assessment',
          text: this.$t('nav.assessment'),
          active: true
        },
        results: {
          url: '/results',
          text: this.$t('nav.results'),
          active: false
        },
        advocate: {
          url: '/advocate',
          text: this.$t('nav.advocate'),
          active: false
        }
      }
    }
  },
  methods: {
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
  composes: paddingRightNarrow paddingVerticalXnarrow from 'styles/spacing.scss';
  display: inline-block;
  max-width: 11rem;

  &:after {
    content: none !important; // never show active styles
  }
}

.menu {
  display: inline-block;
  text-align: right;

  @supports (display: flex) {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
}
</style>

<!-- main menu styles -->
<style lang="scss" module="menu">
@import '~styleConfig/spacing';
@import '~styleConfig/color';
@import '~styleConfig/borders';

.list {
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

.item {
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
}

.disabled {
  composes: item;
  color: color('primary', $grade: 60);
}

.arrow {
  color: color('primary', $grade: 40);
  display: block;
  left: -0.25em; // 0.6em/2, subtract a little to optically align
  margin-top: -0.25em; // 0.6em/2, subtract a little to optically align
  position: absolute;
  top: 50%;
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
</style>
