<template>
  <div class="experience" v-observe-visibility="observeVisibilityOptions">
    <div class="page-section experience-header">
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
          <component :is="iconForTag(tag)" class="icon margin-r-2"></component>
          {{tag}}
        </div>
      </div>
    </div>

    <div class="page-section experience-content">
      <div class="section-content">
        <p class="experience-description margin-b-8">
          {{experience.node.description}}
        </p>

        <div class="skills-box" v-if="experience.node.skills.length">
          <div v-for="skillObj in experience.node.skills" class="skills-box-content">
            <div class="skills-box-type">
              <component :is="iconForTag(skillObj.type)" class="icon"></component>
            </div>

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
</template>

<script>
import IconBits from '~/assets/icons/IconBits.svg'
import IconBots from '~/assets/icons/IconBots.svg'
import IconBio from '~/assets/icons/IconBio.svg'
import IconBattlestarGalactica from '~/assets/icons/IconBattlestarGalactica.svg'

export default {
  name: 'Experience',
  props: ['experience'],
  components: {
    IconBits,
    IconBots,
    IconBio,
    IconBattlestarGalactica
  },
  data () {
    return {
      visible: false,
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
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
}

.experience-description {
  margin: 0 auto;
  padding: 1rem 0;
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: 0.025rem;
}


.skills-box {
  background-color: rgba(0, 0, 0, 0.04);
  padding: 1rem;
  padding-left: 0;
  width: 50%;

  .skills-box-content {
    display: flex;

    .skills-box-type {
      flex-shrink: 0;
      padding: 0 0.75rem;

      .icon {
        margin-top: 0.25rem;
      }
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

    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
}
</style>
