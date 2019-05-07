<template>
  <div class="experience">

    <div class="page-section experience-header">
      <div class="section-content section-content-center">
        <h2 class="experience-title">
          {{experience.node.title}}
        </h2>

        <div class="divider-line"></div>

        <h2 class="experience-position">
          {{experience.node.position}}
        </h2>
      </div>

      <ul class="tag-list experience-tags">
        <li class="tag" v-for="tag in experience.node.tags">
          <component :is="iconForTag(tag)" class="icon margin-r-2"></component>
          {{tag}}
        </li>
      </ul>
    </div>

    <div class="page-section experience-content">
      <div class="section-content">
        <p class="experience-description section-content-center">
          {{experience.node.description}}
        </p>

        <div class="achievements-skills-wrap section-content-center">
          <div class="achievements-wrap" v-if="experience.node.achievements.length">
            <ul class="achievements">
              <li class="achievement-item" v-for="achievement in experience.node.achievements">
                {{achievement}}
              </li>
            </ul>
          </div>

          <div class="skills-wrap" v-if="experience.node.skills.length">
            <div class="skills">
              <div class="skill-item" v-for="skillObj in experience.node.skills">
                <div class="skill-type">
                  <component :is="iconForTag(skillObj.type)" class="icon"></component>
                </div>

                <ul class="tag-list skill-list">
                  <li class="tag" v-for="skill in skillObj.items">
                    {{skill}}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="publications-wrap section-content-center" v-if="experience.node.publications.length">
          <ul class="publications" v-if="experience.node.publications.length">
            <li class="publication-item" v-for="publication in experience.node.publications">
              <div class="publication-icon">
                <icon-book class="icon"></icon-book>
              </div>
              <a class="publication-link" :href="publication.link" target="_blank">
                <div class="publication-title">{{publication.title}}</div>
                <div class="publication-journal">{{publication.journal}}</div>
              </a>
            </li>
          </ul>
        </div>

        <image-gallery v-if="experience.node.images.length" :images="experience.node.images" @image-clicked="openImage"></image-gallery>
      </div>
    </div>

    <client-only>
      <image-viewer v-if="experience.node.images.length" :images="experience.node.images" ref="imageViewer"></image-viewer>
    </client-only>
  </div>
</template>

<script>
import IconBits from '~/assets/icons/IconBits.svg'
import IconBots from '~/assets/icons/IconBots.svg'
import IconBio from '~/assets/icons/IconBio.svg'
import IconBattlestarGalactica from '~/assets/icons/IconBattlestarGalactica.svg'
import IconBook from '~/assets/icons/IconBook.svg'
import ImageGallery from '~/components/ImageGallery'
import ImageViewer from '~/components/ImageViewer'

export default {
  name: 'Experience',
  props: ['experience'],
  components: {
    IconBits,
    IconBots,
    IconBio,
    IconBattlestarGalactica,
    IconBook,
    ImageGallery,
    ImageViewer
  },
  methods: {
    iconForTag (tagName) {
      return `Icon${tagName.replace(' ', '')}`
    },
    openImage (imageIndex) {
      this.$refs.imageViewer.open(imageIndex)
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
  margin-bottom: 3rem;

  @include media('>=tablet') {
    flex-basis: 50%;
    margin-bottom: 3rem;
  }
}

.achievements-wrap {
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
  .skill-item {
    display: flex;

    .skill-type {
      margin-top: 0.2rem;
      padding-right: 1rem;

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

.publications {
  margin-bottom: 3rem;

  .publication-item {
    display: flex;

    .publication-icon {
      display: flex;
      align-items: center;
      color: var(--section-color);
    }

    .publication-link {
      padding-left: 1rem;
      color: inherit !important;
      transition: color 0.1s var(--ease-in-out-quad);
      text-decoration: none;

      &:hover {
        color: var(--section-color) !important;
      }
    }

    .publication-title {
      font-size: 1.2rem;
    }

    .publication-journal {
      font-size: 1.1rem;
      font-style: italic;
    }

    &:not(:last-child) {
      margin-bottom: 1.5rem;
    }
  }
}

.image-gallery-wrap {
  position: relative;
  width: 100vw;
  z-index: 1000;
}
</style>
