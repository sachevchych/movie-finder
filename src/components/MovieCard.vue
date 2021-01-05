<template>
  <div :class="type === 'card' ? 'card' : 'inline'">
    <div v-if="type === 'card'">
      <div class="card-header">
        <div class="card-rating">
          <font-awesome-icon class="card-rating-icon" icon="star"/>
          {{ vote_average }}
        </div>
        <add-to-favorite :id="movie.id"/>
      </div>
      <img :src="`https://image.tmdb.org/t/p/w342${poster_path}`" :alt="title"
           @click="toDetailed(movie.id)">
      <div class="card-footer">
        <h5 class="card-footer-title" @click="toDetailed(movie.id)">{{ title }}</h5>
        <span class="card-footer-date">{{ release_date }}</span><br>
      </div>
    </div>
    <div class="inline-wrap" v-else>
      <div class="inline-poster">
        <div v-if="poster_path">
          <img :src="`https://image.tmdb.org/t/p/w92${poster_path}`" :alt="title"
               @click="toDetailed(movie.id)">
        </div>
        <div v-else class="inline-poster-empty">Image not found</div>
      </div>
      <div class="inline-info">
        <h5 class="card-footer-title" @click="toDetailed(movie.id)">{{ title }}</h5>
        <span class="card-footer-date">{{ release_date }}</span><br>
        <span class="card-footer-date">{{ genres }}</span>
      </div>
      <div class="inline-rating">
        <font-awesome-icon class="card-rating-icon" icon="star"/>
        {{ vote_average }}
      </div>
    </div>
  </div>
</template>

<script>
import AddToFavorite from "@/components/AddToFavorite";

export default {
  name: "MovieCard",
  components: {AddToFavorite},
  props: {
    type: {
      type: String,
      default: 'card'
    },
    movie: {
      type: Object,
      required: true
    }
  },
  methods: {
    toDetailed(id) {
      this.$store.dispatch('fetchMovie', id)
      this.$router.push(`/movie/${id}`)
    }
  },
  computed: {
    genres() {
      let genres = []

      if (this.movie.genre_ids) {
        this.movie.genre_ids.forEach(id => {
          genres.push(this.$store.state.genres.find(element => element.id === id).name)
        })
      } else {
        this.movie.genres.forEach(element => {
          genres.push(element.name)
        })
      }

      return genres.join(', ')
    },
    title() {
      return this.movie.title
    },
    vote_average() {
      return this.movie.vote_average
    },
    poster_path() {
      return this.movie.poster_path
    },
    release_date() {
      return this.movie.release_date
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/vars/vars.scss";

.card {
  position: relative;
  top: 0;
  transition: all .2s ease-in-out;
  width: 100%;
  height: 100%;

  &:hover {
    top: -1rem;

    .card-footer-title {
      color: $primary;
    }

    .card-favorite {
      opacity: 1;
    }
  }

  img {
    cursor: pointer;
    border-radius: .6rem;
    width: 100%;
    height: auto;
  }

}

.card-header {
  position: absolute;
  top: 1rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-rating {
  background-color: $primary;
  padding: .5rem 1rem;
  min-width: 60px;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: .95rem;

  &-icon {
    font-size: .8rem;
    margin-right: .4rem;
  }
}

.card-footer {
  &-title {
    text-align: left;
    transition: all .2s ease-in-out;
    margin-bottom: 0;
    cursor: pointer;
  }

  &-date {
    font-size: .8rem;
    color: $gray;
  }
}

.inline {
  width: 100%;
  &:hover {
    h5 {
      color: $primary;
    }
  }

  &-wrap {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
  }

  &-poster {
    position: relative;
    height: 138px;
    min-width: 92px;
    max-width: 92px;

    img {
      z-index: 6;
      height: 138px;
      width: 92px;
      cursor: pointer;
      object-fit: cover;
      border-radius: 0.3rem;
    }

    &-empty {
      background-color: #555555;
      border-radius: 0.3rem;
      height: 100%;
      text-align: center;
      color: #ffffff;
      display: flex;
      align-items: center;
      font-size: .8rem;
      width: 100%;
      padding: 0.2rem;
    }
  }

  &-info {
    margin-left: 1rem;
  }

  &-rating {
    background-color: $primary;
    padding: .2rem;
    position: absolute;
    top: 0;
    right: 0;
    min-width: 4rem;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>