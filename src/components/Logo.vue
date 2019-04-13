<template>
  <div class="logo" @click="rotateEffect">
    <client-only>
      <transition appear name="fadeInOut" mode="out-in">
        <component v-if="currentEffect" :is="currentEffect" :options="{ poly }"></component>
      </transition>
    </client-only>
  </div>
</template>

<script>
import EffectDroplets from '~/components/effects/EffectDroplets'
import EffectSlices from '~/components/effects/EffectSlices'
import EffectWebs from '~/components/effects/EffectWebs'

export default {
  name: 'Logo',
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
      ],
      effects: [EffectDroplets, EffectSlices, EffectWebs],
      effectsToView: [],
      currentEffect: null
    }
  },
  methods: {
    rotateEffect () {
      if (!this.effectsToView.length) {
        this.effectsToView = this.effects.filter((logo) => {
          return logo !== this.currentEffect
        })
      }
      let randomIndex = Math.floor(Math.random() * this.effectsToView.length)
      this.currentEffect = this.effectsToView[randomIndex]
      this.effectsToView.splice(randomIndex, 1)
    }
  },
  created () {
    this.rotateEffect()
  }
}
</script>

<style lang="scss" scoped>
.logo {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>
