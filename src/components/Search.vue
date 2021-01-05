<template>
  <div class="search">
    <label>
      <input
          class="search-input"
          type="text"
          placeholder="Search by movie title..."
          v-model="input"
          @focusin="setShowDialog(true)"
          @focusout="setShowDialog(false)"
      />
    </label>
    <div class="search-result" v-show="showDialog">
      <ul>
        <li v-for="movie in result" :key="movie.id">
          <movie-card type="inline" :movie="movie"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MovieCard from "@/components/MovieCard";

export default {
  name: "Search",
  components: {MovieCard},
  data() {
    return {
      input: '',
      showDialog: false,
      result: []
    }
  },
  methods: {
    async fetchSearchData() {
      try {
        if (this.input) {
          const result = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=2a90baeaf3dbfed9a704826c18ee72cd&language=en-US&query=${this.input}&page=1&include_adult=false`)
          this.result = result.data.results
          this.showDialog = true
        } else {
          this.showDialog = false
          this.result = []
        }
      } catch (e) {
        console.log(e)
      }
    },
    setShowDialog(value) {
      setTimeout(() => {
        this.showDialog = value
      }, 100);
    }
  },
  watch: {
    input: function () {
      this.fetchSearchData()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/vars/_vars.scss";

.search {
  position: relative;
  width: 100%;
}

.search-input {
  border-radius: .2rem;
  border: 1px solid rgba($light, .4);;
  background-color: rgba($light, .05);
  color: #ffffff;
  font-size: 1rem;
  height: 2.25rem;
  padding: .25rem .5rem;
  width: 100%;
  outline: none;

  &:focus {
    border: 1px solid rgba($primary, 1);
  }
}

.search-result {
  z-index: 5;
  position: absolute;
  top: 40px;
  background-color: #ffffff;
  width: 100%;
  min-width: 300px;
  overflow-y: scroll;
  max-height: 60vh;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    padding: 1rem;
    border-bottom: 1px solid rgba($dark, 0.2);
  }
}
</style>