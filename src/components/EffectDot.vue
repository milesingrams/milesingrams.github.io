<template>
  <div class="effect-dot">
    <client-only>
      <transition appear name="fadeInOut" mode="out-in">
        <component :is="effect" :options="effectOptions"></component>
      </transition>
    </client-only>
  </div>
</template>

<script>
import EffectDroplets from '~/components/effects/EffectDroplets'
import EffectSlices from '~/components/effects/EffectSlices'
import EffectWebs from '~/components/effects/EffectWebs'

export default {
  name: 'EffectDot',
  props: ['effect'],
  components: {
    EffectDroplets,
    EffectSlices,
    EffectWebs
  },
  computed: {
    effectOptions () {
      switch (this.effect) {
        case 'EffectDroplets':
          return {
            maxDepth: 2,
            maxDelay: 0.5,
            radius: 75
          }
          break
        case 'EffectSlices':
          return {
            numSlices: 8,
            maxDelay: 1,
            opacity: 0.5,
            radius: 75
          }
          break
        case 'EffectWebs':
          return {
            numPathsPerLayer: 3,
            numLayers: 3,
            numInternalPoints: 3,
            minDepth: 0.25,
            maxDepth: 1,
            maxDelay: 1.5,
            duration: 1.5
          }
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.effect-dot {
  width: 100%;
  height: 100%;
}
</style>
