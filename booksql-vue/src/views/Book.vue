<template>
    <div class="book">
        <ApolloQuery
            :query="require('../graphql/queries/Book.gql')"
            :variables="{ id: $route.params.id }"
        >
            <template slot-scope="{ result: { data, isLoading } }">
                <div v-if="isLoading">Loading...</div>
                <div v-else>
                    <div>
                        {{ data.book.title }}
                    </div>

                    <div>
                        {{ data.book.author }}
                    </div>
                    <img :src="`${data.book.image}`" alt="cover image" />
                    <div>
                        <router-link
                            :to="`/books/${data.book.id}/edit`"
                            class="link-margin"
                            >Edit</router-link
                        >
                        <a href="#" class="link-margin">Delete</a>
                    </div>
                </div>
            </template>
        </ApolloQuery>
    </div>
</template>
