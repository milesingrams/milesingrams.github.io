<template>
  <Layout>
    <section class="my-info">
      <div class="logo-wrap">
        <logo-droplets></logo-droplets>
      </div>
      <h1 class="my-name">Miles Ingram</h1>
      <p class="my-pitch">Bits, Bio, Bots, Battlestar Galactica</p>
      <div><a href="tel:646-244-8568">646-244-8569</a></div>
      <div><a href="mailto:milesingrams@gmail.com">milesingrams@gmail.com</a></div>
    </section>

    {{$page.experiences}}
  </Layout>
</template>

<page-query>
{
  experiences: allExperience (sortBy: "date", order: DESC) {
    edges {
      node {
        title
        date
        dateText
        tags
        description
      }
    }
  }
}
</page-query>

<script>
import LogoDroplets from '~/components/logos/droplets/LogoDroplets'

export default {
  components: {
    LogoDroplets
  },
  metaInfo: {
    title: 'Miles Ingram'
  }
}
</script>

<style lang="scss" scoped>
.my-info {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 20px;
}

.logo-wrap {
  width: 240px;
  height: 240px;
  margin: 0 auto;
  margin-bottom: 24px;
  position: relative;
}

.my-name {
  text-align: center;
  font-weight: 600;
  margin-bottom: 6px;
}

.my-pitch {
  text-align: center;
  font-weight: 300;
  margin-bottom: 8px;
}
</style>
