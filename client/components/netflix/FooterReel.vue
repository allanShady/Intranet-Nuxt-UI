<template>
    <footer class="level">
        <div class="level-item" v-for="movie in movies" :key="movie.id">
            <a class="movie-link" tabindex="0">
                <img class="movie-image" :src="movie.thumbnailSrc" />
                <caption class="movie-caption">{{movie.name}}</caption>
            </a>
        </div>
    </footer>
</template>

<script>
import data from "@/api/netflix/movies"
import Employments from "@/api/rh/employments";

export default {
    data: () => ({
        movies: data,
    }),
}
</script>

