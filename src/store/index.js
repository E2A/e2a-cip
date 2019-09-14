import Vue from 'vue'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import database from './database'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    mountedActivity: null,
    infoFlyout: {},
    progress: {
      plan: false,
      activities: false,
      analyze: false,
      results: false
    }
  },
  getters: {
    mountedActivity: state => {
      return state.mountedActivity
    },
    infoFlyout: state => {
      return state.infoFlyout
    },
    currentProgress: state => {
      return state.progress
    }
  },
  mutations: {
    SET_MOUNTED_ACTIVITY (state, activityId) {
      state.mountedActivity = activityId
    },
    SET_PROGRESS (state, progress) {
      state.progress = { ...state.progress, ...progress }
    },
    SET_INFO_FLYOUT (state, flyoutData) {
      state.infoFlyout = flyoutData
    },
    CLOSE_FLYOUTS (state) {
      state.infoFlyout = {}
    },
    CLOSE_ACTIVITY_TRAY (state) {
      state.mountedActivity = null
    }
  },
  plugins: [VuexORM.install(database), createPersistedState()]
})

export default store
