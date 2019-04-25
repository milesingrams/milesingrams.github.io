<template>
  <div class="experience">

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
        <p class="experience-description">
          {{experience.node.description}}
        </p>

        <div class="achievements-skills-wrap">
          <div class="achievements-wrap">
            <ul class="achievements">
              <li class="achievement-item" v-for="achievement in experience.node.achievements">
                {{achievement}}
              </li>
            </ul>
          </div>

          <div class="skills-wrap">
            <div class="skills">
              <div class="skill-item" v-for="skillObj in experience.node.skills">
                <div class="skill-type">
                  <component :is="iconForTag(skillObj.type)" class="icon"></component>
                </div>

                <div class="tag-list skill-list">
                  <div class="tag" v-for="skill in skillObj.items">
                    {{skill}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="experience-images">
        </div>
      </div>
    </div>

    <image-viewer :images="['https://i.imgur.com/oWS6mfu.jpg', 'https://i.imgur.com/i7ViAZQ.jpg']"></image-viewer>

  </div>
</template>

<script>
import IconBits from '~/assets/icons/IconBits.svg'
import IconBots from '~/assets/icons/IconBots.svg'
import IconBio from '~/assets/icons/IconBio.svg'
import IconBattlestarGalactica from '~/assets/icons/IconBattlestarGalactica.svg'
import ImageViewer from '~/components/ImageViewer'

export default {
  name: 'Experience',
  props: ['experience'],
  components: {
    IconBits,
    IconBots,
    IconBio,
    IconBattlestarGalactica,
    ImageViewer
  },
  methods: {
    iconForTag (tagName) {
      return `Icon${tagName.replace(' ', '')}`
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
  font-size: 1.2rem;
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
  margin-bottom: 3rem;
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: 0.025rem;
}

.achievements-skills-wrap {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}

.achievements-wrap, .skills-wrap {
  flex-basis: 100%;

  @include media('>=tablet') {
    flex-basis: 50%;
    margin-bottom: 3rem;
  }
}

.achievements-wrap {
  margin-bottom: 3rem;

  @include media('>=tablet') {
    padding-right: 0.75rem;
  }
}

.skills-wrap {
  @include media('>=tablet') {
    padding-left: 0.75rem;
  }
}

.achievements {
  .achievement-item {
    padding-left: 1rem;
    border-left: 3px solid rgba(var(--section-color-rgb), 0.6);
    font-size: 1.1rem;

    &:not(:last-child) {
      margin-bottom: 1.5rem;
    }
  }
}

.skills {
  background-color: #f3f3f3;
  padding: 1.5rem 0;
  border-radius: 4px;

  .skill-item {
    display: flex;
    padding-right: 1.5rem;

    .skill-type {
      margin-top: 0.2rem;
      padding: 0 1rem;

      .icon {
        opacity: 0.8;
      }
    }

    .skill-list {
      justify-content: flex-start;
      align-items: flex-start;
      margin: -0.15rem;

      .tag {
        font-size: 0.9rem;
        padding: 0.15rem 0.5rem;
        margin: 0.15rem;
        background-color: var(--section-color);
      }
    }

    &:not(:last-child) {
      margin-bottom: 1.5rem;
    }
  }
}
</style>
