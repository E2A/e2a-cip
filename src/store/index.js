import Vue from 'vue'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import database from './database'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    mountedActivity: null,
    infoFlyout: {}
  },
  getters: {
    mountedActivity: state => {
      return state.mountedActivity
    },
    infoFlyout: state => {
      return state.infoFlyout
    }
  },
  mutations: {
    SET_MOUNTED_ACTIVITY (state, activityId) {
      state.mountedActivity = activityId
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

console.log(store)

export default store
