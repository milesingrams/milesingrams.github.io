<template>
  <div class="experience">

    <div class="page-section experience-header">
      <div class="section-content section-content-center">
        <h1 class="experience-title">
          {{experience.node.title}}
        </h1>

        <div class="divider-line"></div>

        <h2 class="experience-position">
          {{experience.node.position}}
        </h2>
      </div>

      <ul class="tag-list experience-tags">
        <li class="tag" v-for="tag in experience.node.tags">
          <component :is="iconForTag(tag)" class="icon mr-xxs"></component>
          {{tag}}
        </li>
      </ul>
    </div>

    <div class="page-section experience-content">
      <div class="section-content">
        <p class="experience-description experience-section section-content-center">
          {{experience.node.description}}
        </p>

        <div class="achievements-skills-wrap experience-section section-content-center">
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


        <ul class="publications-wrap experience-section section-content-center" v-if="experience.node.publications.length">
          <li class="publication-item" v-for="publication in experience.node.publications">
            <div class="publication-icon">
              <icon-book class="icon"></icon-book>
            </div>
            <a class="publication-link" :class="{'pe-none': !publication.link}" :href="publication.link" target="_blank">
              <div class="publication-title">{{publication.title}}</div>
              <div class="publication-journal">{{publication.journal}}</div>
            </a>
          </li>
        </ul>

        <image-gallery class="experience-section" v-if="experience.node.images.length" :images="experience.node.images" @image-clicked="openImage"></image-gallery>

        <div class="site-link-wrap experience-section section-content-center" v-if="experience.node.sitelink">
          <a class="site-link" :href="experience.node.sitelink" target="_blank">{{experience.node.sitelink}}</a>
        </div>
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
  font-family: $font-stack-serif;
  text-transform: uppercase;
	line-height: 1.2;
  text-align: center;
}

.experience-title {
  font-size: 2rem;
  letter-spacing: 0.3rem;
  font-weight: 600;
}

.experience-position {
  font-size: 1.5rem;
  letter-spacing: 0.2rem;
  font-weight: 600;
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

.experience-section {
  &:not(:last-child) {
    margin-bottom: 3.5rem;
  }
}

.experience-description {
  font-size: 1.5rem;
  font-weight: 400;
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
  }
}

.achievements-wrap {
  margin-bottom: 3.5rem;

  @include media('>=tablet') {
    margin-bottom: 0rem;
    padding-right: 1.75rem;
  }
}

.skills-wrap {
  @include media('>=tablet') {
    padding-left: 1.75rem;
  }
}

.achievements {
  .achievement-item {
    padding-left: 1rem;
    margin-left: -1.5px;
    border-left: 3px solid rgba(var(--section-color-rgb), 0.6);
    font-size: 1.25rem;

    &:not(:last-child) {
      margin-bottom: 1.5rem;
    }
  }
}

.skills {
  .skill-item {
    display: flex;
    font-weight: 600;

    .skill-type {
      padding-top: 0.3rem;
      padding-right: 1rem;

      .icon {
        margin-left: -0.5em;
      }
    }

    .skill-list {
      justify-content: flex-start;
      align-items: flex-start;
      margin: -0.15rem;

      .tag {
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


.publications-wrap {

  .publication-item {
    display: flex;
    max-width: 700px;

    .publication-icon {
      display: flex;
      align-items: center;
      color: var(--section-color);
      margin-left: -0.5em;
    }

    .publication-link {
      padding-left: 1rem;
      color: inherit !important;
      transition: color 0.1s $ease-in-out-quad;
      text-decoration: none;

      &:hover {
        color: var(--section-color) !important;
      }
    }

    .publication-title {
      font-weight: 600;
      line-height: 1.2;
    }

    .publication-journal {
      font-size: 0.8rem;
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

.site-link-wrap {
  text-align: center;

  .site-link {
    padding: 0.5rem;
    font-size: 1.2rem;
    text-decoration: none;
    color: var(--section-color);
    border: 2px solid var(--section-color);
    border-radius: 4px;
    transition: background-color 0.3s $ease-in-out-quad, color 0.3s $ease-in-out-quad;

    &:hover {
      background-color: var(--section-color);
      color: white;
    }
  }
}
</style>
