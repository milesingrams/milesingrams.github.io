<template>
  <div class="layout">
    <header class="header">
      <h1>Miles Ingram</h1>
      <p>Bits, Bio, Bots, Battlestar Galactica</p>
      <address>
        <div><a href="tel:646-244-8568">646-244-8569</a></div>
        <div><a href="mailto:milesingrams@gmail.com">milesingrams@gmail.com</a></div>
      </address>
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
