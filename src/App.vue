<template>
  <div style="height: 100%">
    <Header/>
    <div style="height: 100%; padding-top: 100px;">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  components: {Header},
  created() {
    this.$store.dispatch('fetchGenres');
  }
}
</script>

<style lang="scss">
@import "src/assets/vars/_vars.scss";

#app {
  font-family: Rubik, Helvetica, Arial, sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $dark;
  height: 100%;
}

input {
  font-family: Rubik, Helvetica, Arial, sans-serif;
  font-weight: 400;
}

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: $light;
}

::selection {
  background-color: $primary;
  color: #ffffff;
}

* {
  box-sizing: border-box;
}

h1, h2, h3, h4, h5, h6 {
  margin-top: 0;
  margin-bottom: .5rem;
  font-weight: 500;
  line-height: 1.2;
}

h1 {
  font-size: 2.25rem;
}

h2 {
  font-size: 2rem;
}

h3 {
  font-size: 1.75rem;
}

h4 {
  font-size: 1.5rem;
}

h5 {
  font-size: 1.25rem;
}

p {
  font-size: 1.05rem;
  line-height: 1.5;
}

.container {
  padding: 0 1rem;
  width: 100%;
  max-width: $breakpoint-xl;
  margin: 0 auto;
}

::-webkit-scrollbar-button {
  width: 6px;
  height: 0;
}

::-webkit-scrollbar-track {
  background-color: #e2e2e2;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: rgba($primary, 0.7);
}

::-webkit-scrollbar-thumb:hover {
  background-color: $primary
}

::-webkit-scrollbar {
  width: 6px;
}

</style>