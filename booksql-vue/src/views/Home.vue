<template>
    <div class="home">
        <router-link to="/books/add">Add a Book</router-link>
        <!-- Apollo Query -->
        <ApolloQuery :query="categoriesQuery">
            <!-- The result will automatically updated -->
            <template slot-scope="{ result: { data, isLoading } }">
                <!-- Some content -->
                <div v-if="isLoading">Loading...</div>

                <div v-else>
                    <a
                        href="#"
                        @click.prevent="selectCategory('all')"
                        class="link-margin"
                        >All</a
                    >
                    <a
                        href="#"
                        @click.prevent="selectCategory('featured')"
                        class="link-margin"
                        >Featured</a
                    >
                    <a
                        href="#"
                        v-for="category of data.categories"
                        :key="category.id"
                        class="link-margin"
                        @click.prevent="selectCategory(category.id)"
                    >
                        {{ category.id }}. {{ category.name }}
                    </a>
                </div>
            </template>
        </ApolloQuery>

        <div v-if="selectedCategory === 'all'">
            <ApolloQuery :query="query">
                <template slot-scope="{ result: { data, isLoading } }">
                    <div v-if="isLoading">Loading...</div>
                    <div v-else>
                        <div href="#" v-for="book of data.books" :key="book.id">
                            <router-link :to="`/books/${book.id}`">
                                {{ book.id }}. {{ book.title }}
                            </router-link>
                            <div>
                                {{ book.author }}
                            </div>
                            <img :src="`${book.image}`" alt="cover image" />
                        </div>
                    </div>
                </template>
            </ApolloQuery>
        </div>
        <div v-else-if="selectedCategory === 'featured'">
            <ApolloQuery :query="query" :variables="{ featured: true }">
                <template slot-scope="{ result: { data, isLoading } }">
                    <div v-if="isLoading">Loading...</div>
                    <div v-else>
                        <div
                            href="#"
                            v-for="book of data.booksByFeature"
                            :key="book.id"
                        >
                            <router-link :to="`/books/${book.id}`">
                                {{ book.id }}. {{ book.title }}
                            </router-link>
                            <div>
                                {{ book.author }}
                            </div>
                            <img :src="`${book.image}`" alt="cover image" />
                        </div>
                    </div>
                </template>
            </ApolloQuery>
        </div>
        <div v-else>
            <ApolloQuery :query="query" :variables="{ id: selectedCategory }">
                <!-- The result will automatically updated -->
                <template slot-scope="{ result: { data, isLoading } }">
                    <!-- Some content -->
                    <div v-if="isLoading">Loading...</div>
                    <div v-else>
                        <div
                            href="#"
                            v-for="book of data.category.books"
                            :key="book.id"
                        >
                            <router-link :to="`/books/${book.id}`">
                                {{ book.id }}. {{ book.title }}
                            </router-link>
                            <div>
                                {{ book.author }}
                            </div>
                            <img :src="`${book.image}`" alt="cover image" />
                        </div>
                    </div>
                </template>
            </ApolloQuery>
        </div>
        <!--Tste sem componentes -->
        <!--  <ul>
            <li v-for="category of categories" :key="category.id">
                {{ category.id }} - {{ category.name }}
            </li>
        </ul>
        <ul>
            <li v-for="book of books" :key="book.id">
                {{ book.id }} - {{ book.title }}
            </li>
        </ul> -->
    </div>
</template>

<script>
// @ is an alias to /src
//import gql from "graphql-tag";
//import { CATEGORIES } from "../graphql/queries/teste_sem_components/categories";
//import { BOOKS } from "../graphql/queries/teste_sem_components/books";
import categoryQuery from "../graphql/queries/Category.gql";
import booksFeaturedQuery from "../graphql/queries/BooksFeatured.gql";
import booksQuery from "../graphql/queries/Books.gql";
import categoriesQuery from "../graphql/queries/Categories.gql";

export default {
    name: "Home",
    data() {
        return {
            categoriesQuery,
            booksQuery,
            categoryQuery,
            booksFeaturedQuery,
            selectedCategory: "all",
            query: booksQuery,
        };
    },

    methods: {
        selectCategory(category) {
            if (category === "all") {
                this.query = booksQuery;
            } else if (category === "featured") {
                this.query = booksFeaturedQuery;
            } else {
                this.query = categoryQuery;
            }
            this.selectedCategory = category;
        },
    },
    /* data() {
        return {
            categories: [],
            books: [],
        };
    }, */

    /* mounted() {
        this.getAllCategories();
        this.getAllBooks();
    },

    methods: {
        async getAllCategories() {
            const result = await this.$apollo.query({
                query: CATEGORIES,
            });
            this.categories = result.data.categories;
        },

        async getAllBooks() {
            const result = await this.$apollo.query({
                query: BOOKS,
            });
            this.books = result.data.books;
        },
    }, */
};
</script>

<style>
.link-margin {
    margin-right: 24px;
}
</style>
