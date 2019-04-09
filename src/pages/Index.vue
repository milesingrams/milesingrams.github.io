<template>
  <Layout>
    <h1>Hello, world!</h1>
    {{$page.experiences}}
  </Layout>
</template>

<page-query>
{
  experiences: allExperience {
    edges {
      node {
        title
        tags
        description
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: 'Miles Ingram'
  }
}
</script>

<style lang="scss">
</style>
