<template>
  <div class="t-item" :class="{ visible }">
    <div class="t-item-dot" v-if="visible">
      <effect-dot :effect="effect"></effect-dot>
    </div>
    <div class="t-item-date">{{date}}</div>
    <div class="t-item-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import EffectDot from '~/components/EffectDot'

export default {
  name: 'TimelineItem',
  props: ['date', 'effect'],
  components: {
    EffectDot
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    updateVisible () {
      let rect = this.$el.getBoundingClientRect()
      if (rect.bottom <= window.innerHeight) {
        this.visible = true
      }
    }
  },
  mounted () {
    this.updateVisible()
    window.addEventListener('scroll', this.updateVisible)
    window.addEventListener('resize', this.updateVisible)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.updateVisible)
    window.removeEventListener('resize', this.updateVisible)
  }
}
</script>

<style lang="scss" scoped>
.t-item {
  position: relative;
  width: 100%;
  margin-bottom: $spacing-l;
  padding-left: 16%;
  padding-right: $spacing-s;
  opacity: 0;
  transition: opacity 1s var(--ease-in-quad);

  &.visible {
    opacity: 1;
  }

  .t-item-dot {
    position: absolute;
    top: 50%;
    left: 8%;
    width: 80px;
    height: 80px;
    padding: 30px;
    background: radial-gradient(closest-side, rgba(var(--page-bg-color-rgb), 1), rgba(var(--page-bg-color-rgb), 0));
    transform: translate(-50%, -50%);
  }

  .t-item-date {
    font-size: 1.25rem;
  }

  @include media(">tablet") {
    padding-right: $spacing-l;

    .t-item-date {
      font-size: 1.5rem;
    }
  }

  @include media(">desktop") {
    padding-left: $spacing-xl;
    padding-right: $spacing-xxl;
    width: 50%;

    &:nth-child(even) {
      padding-left: $spacing-xxl;
      padding-right: $spacing-xl;
      left: 50%;

      .t-item-dot {
        left: 0;
      }

      .t-item-date {
        right: 100%;
        left: initial;
        margin-right: $spacing-l;
        margin-left: 0;
      }
    }

    .t-item-dot {
      left: 100%;
    }

    .t-item-date {
      position: absolute;
      top: 50%;
      left: 100%;
      margin-left: $spacing-l;
      transform: translateY(-50%);
    }
  }
}
</style>
