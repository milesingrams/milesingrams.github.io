<template>
  <Layout>
    <section class="my-info">
      <div class="logo-wrap" @click="rotateEffect">
        <logo :effect="effect"></logo>
      </div>
      <h1 class="my-name">Miles Ingram</h1>
      <p class="my-pitch">Bits, Bio, Bots, Battlestar Galactica</p>
    </section>

    <section class="timeline">
      <timeline-item v-for="(experience, index) in $page.experiences.edges" :date="experience.node.date" :effect="effect" :key="index">
        <h2>{{experience.node.title}}</h2>
        <p>{{experience.node.description}}</p>
      </timeline-item>
    </section>

    <div class="scroll-down-footer"></div>
  </Layout>
</template>

<page-query>
{
  experiences: allExperience (sortBy: "date", order: DESC) {
    edges {
      node {
        title
        date (format: "YYYY")
        tags
        position
        description
      }
    }
  }
}
</page-query>

<script>
import Logo from '~/components/Logo'
import TimelineItem from '~/components/TimelineItem'

export default {
  components: {
    Logo,
    TimelineItem
  },
  data () {
    return {
      effects: ['EffectDroplets', 'EffectSlices', 'EffectWebs'],
      effectsToView: [],
      effect: null
    }
  },
  methods: {
    rotateEffect () {
      if (!this.effectsToView.length) {
        this.effectsToView = this.effects.filter((effect) => {
          return effect !== this.effect
        })
      }
      let randomIndex = Math.floor(Math.random() * this.effectsToView.length)
      this.effect = this.effectsToView[randomIndex]
      this.effectsToView.splice(randomIndex, 1)
    }
  },
  created () {
    this.rotateEffect()
  },
  metaInfo: {
    title: 'Miles Ingram'
  }
}
</script>

<style lang="scss" scoped>
.my-info {
  height: 65vh;
  width: 100%;
  min-height: 475px;
  max-height: 800px;
  padding-bottom: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;

  .logo-wrap {
    width: 200px;
    height: 200px;
    margin-bottom: 40px;
    position: relative;
  }

  .my-name {
    text-align: center;
    font-weight: 500;
    margin-bottom: 6px;
    opacity: 0;
    animation: fadeIn .75s var(--ease-in-out-quad) forwards 0.5s;
  }

  .my-pitch {
    text-align: center;
    font-size: 1.1rem;
    opacity: 0;
    animation: fadeIn .75s var(--ease-in-out-quad) forwards 0.75s;
  }
}

.timeline {
  position: relative;
  width: 100%;
  padding: $spacing-m 0;

  &::before {
    content: '';
    position: absolute;
    width: 1px;
    background-color: var(--timeline-color);
    top: 0;
    height: 0%;
    left: 8%;
    margin-left: -0.5px;
    animation: timelineGrow 1s var(--ease-in-quad) forwards 3s;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 8%;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: var(--page-bg-color);
    border: 1px solid var(--timeline-color);
    transform: translate(-50%, -50%) scale(0);
    animation: timelineDotAppear .5s var(--ease-out-back) forwards 2s;
  }

  @include media(">tablet") {
    &::after {
      width: 24px;
      height: 24px;
    }
  }

  @include media(">desktop") {
    &::before, &::after {
      left: 50%;
    }
  }
}

.scroll-down-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(rgba(var(--page-bg-color-rgb), 0), rgba(var(--page-bg-color-rgb), .9) 75%, rgba(var(--page-bg-color-rgb), 1));
  pointer-events: none;
}

@keyframes timelineDotAppear {
  from {
    transform: translate(-50%, -50%) scale(0);
  }
  to {
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes timelineGrow {
  from {
    height: 0;
  }
  to {
    height: 100%;
  }
}
</style>
