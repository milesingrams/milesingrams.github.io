<template>
  <div class="contact">
    <a class="contact-button" href="mailto:milesingrams@gmail.com" target="_blank">
      <icon-email class="icon"></icon-email>
    </a>
    <a class="contact-button" href="https://www.linkedin.com/in/milesingram" target="_blank">
      <icon-linkedin class="icon"></icon-linkedin>
    </a>
    <a class="contact-button" href="https://github.com/milesingrams" target="_blank">
      <icon-github class="icon"></icon-github>
    </a>
  </div>
</template>

<script>
import IconEmail from '~/assets/icons/IconEmail.svg'
import IconLinkedin from '~/assets/icons/IconLinkedin.svg'
import IconGithub from '~/assets/icons/IconGithub.svg'

export default {
  name: 'Contact',
  components: {
    IconEmail,
    IconLinkedin,
    IconGithub
  }
}
</script>

<style lang="scss" scoped>
.contact {
  position: fixed;
  top: 0;
  right: 0;
  padding: 0.5rem;
  z-index: 10000;
  display: flex;

  .contact-button {
    display: flex;
    align-items: center;
    justify-content: center;
    color: inherit !important;
    transition: transform .2s var(--ease-in-out-quad);

    .icon {
      height: 20px;
      width: 20px;
    }

    &:hover {
      transform: scale(1.25);
    }

    &:not(:last-child) {
      margin-right: 10px;
    }
  }
}
</style>
