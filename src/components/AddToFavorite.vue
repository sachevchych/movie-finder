<template>
  <div class="card-favorite" @click="addToFavorites">
    <font-awesome-icon class="card-favorite-icon" icon="heart"/>
  </div>
</template>

<script>
export default {
  name: "AddToFavorie",
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
    async addToFavorites() {
      // Checks if such an id exists
      if (!this.$store.state.favorites.find(element => element.id === this.id)) {
        await this.$store.dispatch('addToFavorite', this.id)

        if (localStorage.favorites) {
          localStorage.favorites = localStorage.favorites + `,${this.id}`
        } else {
          localStorage.favorites = this.id
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/vars/_vars.scss";

.card-favorite {
  cursor: pointer;
  transition: all .3s ease-in-out;
  opacity: .7;
  display: flex;
  height: 2.1rem;
  width: 2.1rem;
  margin-right: .8rem;
  border-radius: 50%;
  background-color: rgba($pink, .4);
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: rgba($pink, .7);
  }

  &-icon {
    font-size: 1rem;
    color: $light;
  }
}
</style>