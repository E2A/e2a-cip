<template>
  <div>
    <header :class="base.wrapper">
      <router-link
        :to="{name: 'home'}"
        :class="base.logo"
      >
        <img src="http://placehold.it/250x40" alt="logos" />
      </router-link>
      <nav :class="base.menu">
        <BaseGutterWrapper
          :class="base.menuList"
          gutterY="xnarrow"
          gutterX="xnarrow"
        >
          <li
            id="nav"
            v-for="(link, index) in this.getLinks()"
            :key="`link-${index}`"
            :class="base.menuItem"
          >
            <router-link
              v-if="link.active"
              :to="link.url"
              exact
            >
              {{link.text}}
            </router-link>
            <span v-if="!link.active">{{link.text}}</span>
          </li>
        </BaseGutterWrapper>
      </nav>
    </header>

    <!-- convert these to notifications -->
    <p v-if="this.getItemCount('assessments') === 0">
      {{$t('nav.addAssessment')}}
    </p>
    <p v-if="this.getItemCount('assessments') > 0">
      {{$t('nav.removeAssessment')}}
    </p>
  </div>
</template>

<script>
import { dataMethods } from './mixins/dataMethods'
import BaseGutterWrapper from './BaseGutterWrapper.vue'

export default {
  name: 'NavHeader',
  mixins: [dataMethods],
  components: {
    BaseGutterWrapper
  },
  data: function () {
    return {
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
    getLinks: function () {
      this.updateActiveLinks()
      return this.links
    },
    updateActiveLinks: function () {
      if (this.getItemCount('assessments') > 0) {
        this.links.activities.active = false
        this.links.summary.active = false
        this.links.results.active = true
        this.links.advocate.active = true
      }

      if (this.getItemCount('activities') === 0 && this.getItemCount('setup') === 0) {
        this.links.activities.active = false
        this.links.summary.active = false
        this.links.results.active = false
        this.links.advocate.active = false
        this.links.bestPractices.active = false
        this.links.assessment.active = false
      }

      if (this.getItemCount('activities') === 0 && this.getItemCount('setup') > 0) {
        this.links.activities.active = true
        this.links.summary.active = false
        this.links.results.active = false
        this.links.advocate.active = false
        this.links.bestPractices.active = false
        this.links.assessment.active = false
      }

      if (this.getItemCount('activities') > 0 && this.getItemCount('assessments') === 0) {
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

.wrapper {
  composes: paddingHorizontal paddingVerticalXnarrow from 'styles/spacing.scss';
  composes: bottom from 'styles/borders.scss';
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  composes: paddingRightXnarrow from 'styles/spacing.scss';
  display: block;
}

.menu {
  flex: 1;
  text-align: right;
}

.menuList {
  display: inline-block;
  list-style: none;
}

.menuItem {
  display: inline-block;

  & + &::before {
    content: '\203A';
    display: inline-block;
    margin-right: (space('xnarrow', true) + 0.1rem);
  }
}
</style>

<!-- use global style for vue router active class -->
<style lang="scss">
@import '~styleConfig/color';

.router-link-active {
  color: color('highlight');
}
</style>
