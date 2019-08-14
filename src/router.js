import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Setup from './views/Setup.vue'
import Activity from './views/Activity.vue'
import ActivityTypeInfo from './views/ActivityTypeInfo.vue'
import Summary from './views/Summary.vue'
import BestPractices from './views/BestPractices.vue'
import BestPractice from './views/BestPractice.vue'
import Assessment from './views/Assessment.vue'
import Results from './views/Results.vue'
import Advocate from './views/Advocate.vue'
import Print from './views/Print.vue'
import Export from './views/Export.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/setup/',
      name: 'setup',
      component: Setup
    },
    {
      path: '/activity/:activityId?',
      name: 'activity',
      component: Activity,
      props: true
    },
    {
      path: '/activity-type-info/:backToActivityId',
      name: 'activity-type-info',
      component: ActivityTypeInfo,
      props: true
    },
    {
      path: '/summary',
      name: 'summary',
      component: Summary
    },
    {
      path: '/analysis',
      name: 'assessment',
      component: Assessment
    },
    {
      path: '/evidence-informed-practices',
      name: 'evidence-informed-practices',
      component: BestPractices
    },
    {
      path: '/evidence-informed-practice/:id',
      name: 'evidence-informed-practice',
      component: BestPractice,
      props: true
    },
    {
      path: '/results',
      name: 'results',
      component: Results
    },
    {
      path: '/advocate',
      name: 'advocate',
      component: Advocate
    },
    {
      path: '/print',
      name: 'print',
      component: Print
    },
    {
      path: '/export/:redirect',
      name: 'export',
      component: Export,
      props: true
    }

  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  mode: 'history'
})
