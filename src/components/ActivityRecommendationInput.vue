<!--
  Result Input component
  -> use to add an recommendation to an activity
  -> part of Activity List
-->

<template>
  <li :class="base.wrapper">
    <div :class="base.numberWrapper">
      <BaseGutterWrapper
        :class="base.flex"
        gutterY="narrow"
        gutterX="narrow"
      >
        <div :class="[base.gutter, base.fill]">
          <BaseFormInput
            v-model="recommendationText"
            @change="updateRecommendation()"
            textSize="zeta"
            labelTextSize="zeta"
            el="textarea"
          />
        </div>
        <div :class="base.gutter">
          <BaseButton
            @click="deleteRecommendation()"
            :label="$t('delete')"
            size="small"
          />
        </div>
      </BaseGutterWrapper>
    </div>
  </li>
</template>

<script>
// @ is an alias to /src
import BaseHeading from './BaseHeading.vue'
import BaseButton from './BaseButton.vue'
import BaseFormInput from './BaseFormInput.vue'
import BaseGutterWrapper from './BaseGutterWrapper.vue'

export default {
  name: 'ActivityRecommendationInput',
  components: {
    BaseHeading,
    BaseButton,
    BaseFormInput,
    BaseGutterWrapper
  },
  props: {
    'activityInstance': {
      type: Object,
      required: false
    },
    'recommendationId': {
      type: Number,
      required: false
    },
    'recommendationType': {
      type: String,
      required: true,
      validator: function (value) {
        // The value must match one of these strings
        return ['insert', 'update'].indexOf(value) !== -1
      }
    },
    'globalRecommendation': {
      type: Boolean,
      required: false
    },
    'existingRecommendationText': {
      type: String,
      required: false
    }
  },
  data () {
    return {
      recommendationText: this.existingRecommendationText
    }
  },
  methods: {
    updateRecommendation: function () {
      if (this.globalRecommendation) {
        if (this.recommendationType === 'update') {
          // Update recommendation
          this.$store.dispatch('entities/globalrecommendations/update', {
            id: this.recommendationId,
            text: this.recommendationText
          })
        } else if (this.recommendationType === 'insert') {
          // Add a new recommendation
          this.$store.dispatch('entities/globalrecommendations/insert', {
            data: {
              text: this.recommendationText
            }
          })
        }
      } else {
        if (this.recommendationType === 'update') {
          // Update recommendation
          this.$store.dispatch('entities/recommendations/update', {
            id: this.recommendationId,
            activity_id: this.activityInstance.id,
            text: this.recommendationText
          })
        } else if (this.recommendationType === 'insert') {
          // Add a new recommendation
          this.$store.dispatch('entities/recommendations/insert', {
            data: {
              activity_id: this.activityInstance.id,
              text: this.recommendationText
            }
          })
        }
      }
    },
    deleteRecommendation: function () {
      // Remove recommendation
      if (this.globalRecommendation) {
        this.$store.dispatch('entities/globalrecommendations/delete', this.recommendationId)
      } else {
        this.$store.dispatch('entities/recommendations/delete', this.recommendationId)
      }
    }
  }
}
</script>

<style src="styles/type.scss" lang="scss" module="type"></style>

<style lang="scss" module="base">
@import '~styleConfig/scale';
@import '~styleConfig/type';
@import '~styleConfig/color';
@import '~styleConfig/spacing';

.wrapper {
  display: block;
  position: relative;
}

.numberWrapper {
  composes: paddingLeft from 'styles/spacing.scss';
  counter-increment: recommendations;
  display: block;
  position: relative;

  &::before {
    @include font();
    color: color('midtone');
    content: counter(recommendations);
    display: block;
    font-size: scale-type('epsilon');
    left: 0;
    line-height: 1;
    position: absolute;
    top: (space('narrow') + 0.2rem); // matches gutterWrapper gutters
  }
}

.flex {
  @supports (display: flex) {
    display: flex;
    align-items: flex-start;
  }
}

.fill {
  @supports (flex: 1) {
    flex: 1;
  }
}

.gutter {
  display: inline-block;
  vertical-align: top;
}
</style>
