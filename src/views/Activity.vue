<template>
  <NavFooter
    :left-buttons="this.getNavButtons().left"
    :right-buttons="this.getNavButtons().right"
  >
    <ActivityInput
      ref="activityInput"
      :activity-id="currentActivity"
      :key="this.getLastItem()"
      :can-submit="isFormFilled"
      @changed="trackValidation"
    />
  </NavFooter>
</template>

<script>
import ActivityInput from "@/components/ActivityInput.vue";
import NavFooter from "@/components/NavFooter.vue";
import { dataMethods } from "@/components/mixins/dataMethods";

export default {
  name: "Activity",
  components: {
    ActivityInput,
    NavFooter,
  },
  mixins: [dataMethods],
  props: {
    activityId: [String, Number],
  },
  data: function () {
    return {
      isFormFilled: false,
      previousRoute: null,
    };
  },
  computed: {
    nextActivity: function () {
      return this.getNextActivity;
    },
    currentActivity: function () {
      return this.$props.activityId || this.nextActivity();
    },
  },
  beforeRouteEnter: function (to, from, next) {
    next((vm) => {
      vm.previousRoute = from;
    });
  },
  created: function () {
    this.$store.commit("SET_PROGRESS", { activities: true });
  },
  methods: {
    trackValidation: function (isFormFilled) {
      // toggle form is filled
      this.isFormFilled = isFormFilled;
    },
    goBack: function () {
      if (this.previousRoute) {
        return this.previousRoute;
      }

      return { name: "setup" };
    },
    getNavButtons: function () {
      var navButtons = {
        left: [
          {
            // to: { name: 'setup' },
            to: this.goBack(),
            label: this.$t("goBack"),
          },
        ],
        right: [],
      };

      navButtons.right.push(
        {
          to: { name: "activity" },
          label: this.$t("inputNextActivity"),
          iconLeft: "add",
          iconRight: "none",
          role: this.isFormFilled ? "primary" : "default",
          action: "addActivity",
        },
        {
          to: { name: "summary" },
          label: this.$t("saveAndContinue"),
          action: "addActivity",
        }
      );

      return navButtons;
    },
  },
};
</script>
