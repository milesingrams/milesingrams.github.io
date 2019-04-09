<template>
  <Layout>
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
export default {
  metaInfo: {
    title: 'Miles Ingram'
  }
}
</script>

<style lang="scss">
</style>
