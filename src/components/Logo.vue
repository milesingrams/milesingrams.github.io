<template>
  <div class="logo">
    <client-only>
      <transition appear name="fadeInOut" mode="out-in">
        <component :is="effect" :options="{ poly, color }"></component>
      </transition>
    </client-only>
  </div>
</template>

<script>
import EffectDroplets from '~/components/effects/EffectDroplets'
import EffectGradient from '~/components/effects/EffectGradient'
import EffectSlices from '~/components/effects/EffectSlices'
import EffectWebs from '~/components/effects/EffectWebs'

export default {
  name: 'Logo',
  props: ['effect', 'color'],
  components: {
    EffectDroplets,
    EffectGradient,
    EffectSlices,
    EffectWebs
  },
  data () {
    return {
      poly: [
        [0, 0],
        [50, 50],
        [100, 0],
        [100, 100],
        [80, 100],
        [80, 45],
        [50, 75],
        [20, 45],
        [20, 100],
        [0, 100],
        [0, 0]
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  width: 100%;
  height: 100%;
}
</style>
