<template>
  <div class="experience" v-observe-visibility="observeVisibilityOptions">
    <div class="page-section experience-header" :style="{'filter': `url(#${inkFilterId}-filter)`}">
      <ink-filter :id="`${inkFilterId}`" :trigger="visible"></ink-filter>

      <div class="section-content">
        <h2 class="experience-title">
          {{experience.node.title}}
        </h2>

        <div class="divider-line"></div>

        <h2 class="experience-position">
          {{experience.node.position}}
        </h2>
      </div>

      <div class="tag-list experience-tags">
        <div class="tag" v-for="tag in experience.node.tags">
          <component :is="iconForTag(tag)" class="icon"></component>
          {{tag}}
        </div>
      </div>
    </div>

    <div class="page-section experience-content">
      <div class="section-content">
        <p class="experience-description margin-b-8">
          {{experience.node.description}}
        </p>

        <div class="experience-skills-list">
          <div v-for="skillObj in experience.node.skills" class="skills-box">
            <div class="skills-box-content">
              <h3 class="skills-box-header">
                {{skillObj.type}}
              </h3>

              <div class="tag-list skills-box-list">
                <div class="tag" v-for="skill in skillObj.items">
                  {{skill}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InkFilter from '~/components/InkFilter'
import IconBits from '~/assets/icons/IconBits.svg'
import IconBots from '~/assets/icons/IconBots.svg'
import IconBio from '~/assets/icons/IconBio.svg'
import IconBattlestarGalactica from '~/assets/icons/IconBattlestarGalactica.svg'

export default {
  name: 'Experience',
  props: ['experience'],
  components: {
    InkFilter,
    IconBits,
    IconBots,
    IconBio,
    IconBattlestarGalactica
  },
  data () {
    return {
      visible: false,
      inkFilterId: Math.floor(Math.random() * 9999),
      observeVisibilityOptions: {
        callback: this.visibilityChanged,
        once: true
      }
    }
  },
  methods: {
    iconForTag (tagName) {
      return `Icon${tagName.replace(' ', '')}`
    },
    visibilityChanged (isVisible) {
      if (isVisible) {
        this.visible = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.experience-header {
  color: white;
  background-color: var(--section-color);
}

.experience-title, .experience-position {
  font-family: 'Averia Serif Libre';
  text-transform: uppercase;
  font-weight: 300;
  line-height: 1.2;
  text-align: center;
}

.experience-title {
  font-size: 1.7rem;
  letter-spacing: 0.3rem;
}

.experience-position {
  font-size: 1.3rem;
  letter-spacing: 0.2rem;
}

.experience-tags {
  position: absolute;
  top: 100%;
  z-index: 1;

  .tag {
    color: white;
    background-color: var(--section-color);
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
}

.experience-description {
  margin: 0 auto;
  padding: 1rem 0;
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: 0.025rem;
}


.experience-skills-list {
  display: flex;
  flex-wrap: wrap;
  margin: -0.5rem;

  .skills-box {
    flex-basis: 100%;
    flex-grow: 1;
    padding: 0.5rem;

    .skills-box-content {
      background-color: rgba(0, 0, 0, 0.03);
      padding: 1.5rem;
      height: 100%;

      .skills-box-header {
        font-size: 1.2rem;
        color: var(--section-color);
        margin-bottom: 0.5rem;
      }

      .skills-box-list {
        justify-content: flex-start;
        margin: -0.15rem;

        .tag {
          font-size: 0.9rem;
          padding: 0.15rem 0.5rem;
          margin: 0.15rem;
          background-color: var(--section-color);
        }
      }
    }

    @include media('>phone') {
      flex-basis: 50%;
    }
  }
}
</style>
