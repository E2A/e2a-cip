<template>
  <div v-if="this.$route.name !== 'export'">
    <nav :class="base.breadcrumbNav">
      <BaseWidthWrapper width="wide">
        <BaseGutterWrapper :class="base.breadcrumbNavList" el="ul" gutterY="xnarrow" gutterX="medium">
          <NavItem v-for="(link, key, index) in this.getLinks()" :key="`link-${index}`" :link="link" :objectIndex="index" @dispatchNotifications="notificationTrigger" :enableSubnav="false">
          </NavItem>
        </BaseGutterWrapper>
      </BaseWidthWrapper>
    </nav>
  </div>
</template>

<script>
import { dataMethods } from './mixins/dataMethods'
import BaseGutterWrapper from './BaseGutterWrapper.vue'
import BaseWidthWrapper from './BaseWidthWrapper.vue'
import NavItem from './NavItem.vue'

export default {
  name: 'NavBreadcrumbs',
  mixins: [dataMethods],
  components: {
    NavItem,
    BaseGutterWrapper,
    BaseWidthWrapper
  },
  computed: {
    links: function () {
      return {
        plan: {
          name: 'plan',
          text: this.$t('nav.plan'),
          active: true,
          steps: [
            {
              name: 'plan',
              text: this.$t('nav.plan'),
              active: true
            },
            {
              name: 'setup',
              text: this.$t('nav.setup'),
              active: true
            }
          ]
        },
        activities: {
          name: 'activity',
          text: this.$t('nav.activities'),
          active: true,
          steps: [
            {
              name: 'activity',
              text: this.$t('nav.activities'),
              active: true
            },
            {
              name: 'summary',
              text: this.$t('nav.summary'),
              active: true
            }
          ]
        },
        analyze: {
          name: 'evidence-informed-practices',
          text: this.$t('nav.analyze'),
          active: false,
          steps: [
            {
              name: 'evidence-informed-practices',
              childName: 'evidence-informed-practice',
              text: this.$t('nav.bestPractices'),
              active: true
            },
            {
              name: 'assessment',
              text: this.$t('nav.assessment'),
              active: true
            }
          ]
        },
        results: {
          name: 'results',
          text: this.$t('nav.results'),
          active: true,
          steps: [
            {
              name: 'results',
              text: this.$t('nav.results'),
              active: true
            },
            {
              name: 'advocate',
              childName: 'print',
              text: this.$t('nav.advocate'),
              active: true
            }
          ]
        }
      }
    }
  },
  methods: {
    getCurrentRoute: function () {
      // get the (translated) name of the current route
      return Object.values(this.links)
        .reduce((links, link) => {
          return links.concat(link.steps).concat(link)
        }, [])
        .find(link => {
          return (
            link.name === this.$route.name ||
            link.childName === this.$route.name
          )
        }).text
    },
    globalNotification: function (value) {
      const notification = this.$store.getters[
        'entities/globalnotifications/query'
      ]().first()
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
      const currentProgress = this.$store.getters.currentProgress

      this.links.activities.active = currentProgress.activities
      this.links.plan.active = currentProgress.plan
      this.links.results.active = currentProgress.results
      this.links.analyze.active = currentProgress.analyze

      if (this.getItemCount('assessments') > 0) {
        this.notificationMessage = this.$t('nav.removeAssessment')
      }

      if (
        this.getItemCount('activities') === 0 &&
        (this.getItemCount('setup') === 0 || !this.setupPresent())
      ) {
        this.notificationMessage = this.$t('nav.addSetup')
      }

      if (this.getItemCount('activities') === 0 && this.setupPresent()) {
        this.notificationMessage = this.$t('nav.addActivites')
      }

      if (
        this.getItemCount('activities') > 0 &&
        this.getItemCount('assessments') === 0
      ) {
        this.notificationMessage = this.$t('nav.addAssessment')
      }
    }
  }
}
</script>

<style lang="scss" module="base">
@import "~styleConfig/spacing";
@import '~styleConfig/color';
@import '~styleConfig/borders';

  .breadcrumbNav {
    padding: space('medium') space('medium');
  }

  .breadcrumbNavList {
    list-style: none;
    display: flex;
    // justify-content: space-evenly;

    &:after {
      content: '';
      background-color: color('midtone', $grade: 70);
      position: absolute;
      left: 0;
      right: 0;
      bottom: -1px; // height of bottom border on nav wrapper
      height: border-w('thick');
    }
  }
</style>
