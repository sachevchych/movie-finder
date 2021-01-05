<template>
  <div class="wrap" :style="`background-image: url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`">
    <div class="inner">
      <div class="container">
        <div class="main">
          <div class="main-poster" v-if="movie.poster_path !== null">
            <div class="main-poster-header">
              <add-to-favorie :id="movie.id"/>
            </div>
            <img :src="`https://image.tmdb.org/t/p/w342${movie.poster_path}`" :alt="movie.title">
          </div>
          <div class="main-info">
            <h1>{{ movie.title }}</h1>
            <span v-for="(genre, index) in movie.genres" :key="genre.id">
              {{ genre.name }}{{ index !== movie.genres.length - 1 ? ', ' : '' }}
            </span>
            <div v-show="movie.tagline">
              <blockquote>{{ movie.tagline }}</blockquote>
            </div>
            <div >
              <h3>Overview:</h3>
              <p>{{ movie.overview }}</p>
            </div>
            <ul>
              <li>User Score: {{ movie.vote_average }}</li>
              <li v-show="movie.runtime">Runtime:
                {{ movie.runtime > 60 ? `1h ${movie.runtime - 60}m` : `${movie.runtime}m` }}
              </li>
              <li>Status: {{ movie.status }}</li>
              <li>Release date: {{ movie.release_date }}</li>
              <li v-show="movie.budget">Budget: {{ movie.budget / 1000000 }}M</li>
              <li v-show="movie.revenue">Revenue: ${{ movie.revenue / 1000000 }}M</li>
              <li>
                Production countries:
                <template v-for="(country, index) in movie.production_countries" :key="country.iso_3166_1">
                  {{ country.name }}{{ index !== movie.production_countries.length - 1 ? ', ' : '' }}
                </template>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import AddToFavorie from "@/components/AddToFavorite";

export default {
  name: "Detailed",
  components: {AddToFavorie},
  mounted() {
    this.$store.dispatch('fetchMovie', this.$route.params.id)
  },
  computed: {
    movie() {
      return this.$store.state.currentMovie
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/vars/_vars.scss";

.wrap {
  width: 100%;
  height: 100%;
  min-height: 100%;
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
}

.inner {
  background-color: rgba($dark, 0.9);
  width: 100%;
  color: $light;
  height: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
  overflow-y: auto;


  @media screen and (max-width: $breakpoint-md) {
    padding: 2rem 0 ;
    align-items: flex-start;
  }
}

.main {
  display: flex;
  align-items: flex-start;

  @media screen and (max-width: $breakpoint-md) {
    flex-direction: column;
    align-items: center;
  }

  &-poster {
    position: relative;

    img {
      width: 100%;
      min-width: 342px;
      height: 100%;
      border-radius: .6rem;
    }

    &-header {
      position: absolute;
      display: flex;
      justify-content: flex-end;
      width: 100%;
      padding-top: 1rem;
    }
  }

  &-info {
    padding-left: 2rem;

    @media screen and (max-width: $breakpoint-md) {
      padding-left: 0;
      margin-top: 2rem;
      text-align: center;
    }

    h1 {
      margin-bottom: .2rem;
    }

    h3 {
      margin-top: 1rem;
    }

    ul {
      list-style: none;
      padding-left: 0;
      line-height: 2;
    }

    blockquote {
      padding: 1rem 1.5rem;
      margin: 1rem 0;
      position: relative;
      display: inline-block;
      width: auto;

      &::before {
        color: #4829B2;
        font-size: 3rem;
        content: '\201E';
        position: absolute;
        top: 0;
        left: 0;
      }

      &::after {
        color: #4829B2;
        font-size: 3rem;
        content: '\201C';
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
  }
}

</style>