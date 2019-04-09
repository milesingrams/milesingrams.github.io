<template>
  <div class="layout">
    <header class="header">
      <strong>
        <g-link to="/">Miles Ingram</g-link>
      </strong>
    </header>
    <slot/>
  </div>
</template>

<style lang="scss">
body {
  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  margin:0;
  padding:0;
  line-height: 1.5;
}
</style>
