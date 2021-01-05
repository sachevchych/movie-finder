<template>
  <div class="favorites">
    <div class="favorites-btn">
      <font-awesome-icon class="favorites-btn-icon" icon="heart"/>
      <span>{{ $store.state.favorites.length }}</span>
    </div>
    <div class="favorites-content">
      <ul v-if="$store.state.favorites.length" class="favorites-list">
        <li class="favorites-item" v-for="movie in favorites" :key="movie.id">
          <font-awesome-icon icon="times" class="favorites-remove-icon" @click="removeFromFavorites(movie.id)"/>
          <movie-card class="favorites-item-card" type="list" :movie="movie"/>
        </li>
      </ul>
      <div v-else class="empty-favorites">
        The list of favorite movies is currently empty. To add the first movie, click on the heart icon on the desired movie.
      </div>
    </div>
  </div>
</template>

<script>
import MovieCard from "@/components/MovieCard";

export default {
  name: "Favorites",
  components: {MovieCard},
  mounted() {
    this.$store.dispatch('setFavoritesFromLocalStorage')
  },
  methods: {
    removeFromFavorites(movie_id) {
      this.$store.dispatch('removeFromFavorites', movie_id)
    }
  },
  computed: {
    favorites() {
      return this.$store.state.favorites
    }
  }

}
</script>

<style lang="scss" scoped>
@import "src/assets/vars/_vars.scss";

.favorites {
  position: relative;

  &:hover {
    .favorites-content {
      display: block;
    }
  }
}

.favorites-btn {
  color: #e2e2e2;
  width: auto;
  cursor: pointer;
  transition: color .2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 1rem 0;

  &:hover {
    color: $primary;

    span {
      color: #ffffff;
    }
  }

  &-icon {
    font-size: 2rem;
  }

  span {
    transition: color .2s ease-in-out;
    position: absolute;
    color: $dark;
    font-weight: 500;
    font-size: 13px;
    line-height: 13px;
  }
}

.favorites-content {
  display: none;
  max-height: 75vh;
  overflow-y: auto;
  position: absolute;
  z-index: 6;
  right: 0;
  width: 400px;
  background-color: #ffffff;
  border-radius: 0.3rem;
}

.favorites-list {
  list-style: none;
  position: relative;
  margin: 0;
  padding: 0;
}

.favorites-item {
  position: relative;
  padding: 1rem 1rem 1rem 1.5rem;
  border-bottom: 1px solid rgba($dark, .2);
  display: flex;
  align-items: center;

  &-card {
    position: relative;
    left: 0;
    transition: all 0.3s ease-in-out;
  }

  &:hover {
    .favorites-item-card {
      left: 1rem;
    }

    .favorites-remove-icon {
      opacity: 1;
      transform: rotate(0deg);
    }
  }
}

.empty-favorites {
  text-align: center;
  color: rgba($dark, 0.7);
  line-height: 1.5rem;
  padding: 1.5rem 1rem;
}

.favorites-remove-icon {
  transition: all 0.3s ease-in-out;
  transform: rotate(45deg);
  opacity: 0;
  position: absolute;
  font-size: 1.5rem;
  left: 0.75rem;
  color: rgba(red, .7);
  cursor: pointer;

  &:hover {
    color: rgba(red, 1);
  }
}
</style>