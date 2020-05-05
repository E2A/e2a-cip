<template>
  <div v-show="body" :class="base.activityComment">
    <BaseHeading
      :centered="false"
      :level="4"
      :class="base.commentBody"
      scale="eta"
      color="dark"
      weight="regular"
      >{{ body }}</BaseHeading
    >
    <span :class="base.deleteIcon" @click="emitDeleteClick">
      <BaseIcon :class="base.icon" name="close" alt="X" />
    </span>
  </div>
</template>

<script>
import BaseIcon from "@/components/BaseIcon.vue";
import BaseHeading from "@/components/BaseHeading.vue";

export default {
  name: "ActivityComment",
  components: {
    BaseIcon,
    BaseHeading,
  },
  mixins: [],
  props: {
    comment: {
      type: Object,
    },
    activityId: {
      type: Number,
    },
  },
  computed: {
    body: function () {
      return this.comment.text;
    },
  },
  methods: {
    emitDeleteClick: function (event) {
      this.$emit("click", event, this.comment.id);
    },
  },
};
</script>

<style lang="scss" module="base">
@import "~bourbon/core/bourbon";
@import "~styleConfig/scale";
@import "~styleConfig/color";
@import "~styleConfig/spacing";

$size-icons: scale-type("eta");

.icon {
  font-size: $size-icons;
}

.activityComment {
  width: 100%;
  position: relative;
  cursor: pointer;

  &:hover {
    .deleteIcon {
      color: color("warning");
    }
  }
}

.deleteIcon {
  position: absolute;
  right: 0;
  top: -10px;
  color: color("midtone");
  transition: 0.25s ease-in-out;
}

.commentBody {
  padding-bottom: space("xnarrow");
}
</style>
