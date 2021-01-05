<template>
  <div class="wrap">
    <div class="container">
      <div class="header">
        <div class="logo">
          <router-link to="/">Movie Finder.</router-link>
        </div>
        <div class="actions">
          <search/>
          <favorites/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "@/components/Search";
import Favorites from "@/components/Favorites";

export default {
  name: "Header",
  components: {Favorites, Search}
}
</script>

<style lang="scss" scoped>
@import "src/assets/vars/_vars.scss";

.wrap {
  background-color: $dark;
  position: fixed;
  width: 100%;
  z-index: 1;
}

.header {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: $breakpoint-md)  {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

.actions {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.logo {
  color: $light;
  line-height: 1rem;
  font-size: 2rem;
  font-weight: 500;
  min-width: 240px;

  @media screen and (max-width: $breakpoint-md)  {
    display: none;
  }


  a {
    text-decoration: none;
    color: $light;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: $primary;
    }
  }
}
</style>