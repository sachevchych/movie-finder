<template>
  <div>
    <div class="popular">
      <movie-card v-for="movie in popular" :key="movie.id" :movie="movie" />
      <div class="pagination" @click="fetchMovies(currentPage)">
        <font-awesome-icon class="pagination-icon" icon="redo-alt"/>
        <span class="pagination-label">Load more...</span>
      </div>
    </div>
  </div>
</template>

<script>
import MovieCard from "@/components/MovieCard";

export default {
  name: "PopularMovies",
  components: {MovieCard},
  data() {
    return {
      currentPage: 1
    }
  },
  async mounted() {
    if (!this.$store.state.popularMovies.length) {
      await this.fetchMovies(1)
    }
  },
  methods: {
    async fetchMovies(page) {
      await this.$store.dispatch('fetchPopularMovies', page)
      this.currentPage = this.currentPage + 1
    }
  },
  computed: {
    popular() {
      return this.$store.state.popularMovies
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/vars/_vars.scss";

.popular {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-column-gap: 1.2rem;
  grid-row-gap: 2rem;
  padding: 2rem 0;

  @media screen and (min-width: $breakpoint-sm) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: $breakpoint-md) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (min-width: $breakpoint-lg) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media screen and (min-width: $breakpoint-xl) {
    grid-template-columns: repeat(6, 1fr);
  }
}

.pagination {
  background-color: $gray;
  border-radius: .3rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  cursor: pointer;
  min-height: 300px;
  transition: all .3s ease-in-out;

  &:hover {
    background-color: $primary;

    .pagination-icon {
      transform: rotate(180deg);
    }
  }

  &-icon {
    font-size: 3rem;
    transition: all .3s ease-in-out;
    transform: rotate(0deg);
  }
  &-label {
    margin-top: 1rem;
    font-size: 1.15rem;
  }
}
</style>