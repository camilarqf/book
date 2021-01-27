<template>
    <div class="create">
        <h1>Create a book</h1>
        <form action="#" method="post" @submit.prevent="addBook">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" name="title" id="title" v-model="title" />
            </div>
            <div class="form-group">
                <label for="author">Author</label>
                <input type="text" name="author" id="author" v-model="author" />
            </div>
            <div class="form-group">
                <label for="image">Image</label>
                <input type="text" name="image" id="image" v-model="image" />
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea
                    name="description"
                    id="description"
                    cols="30"
                    rows="10"
                    v-model="description"
                ></textarea>
            </div>
            <div class="form-group">
                <label for="link">Link</label>
                <input type="text" name="link" id="link" v-model="link" />
            </div>
            <div class="form-group">
                <label for="featured">Featured</label>
                <input
                    type="checkbox"
                    name="featured"
                    id="featured"
                    v-model="featured"
                />
            </div>

            <ApolloQuery :query="require('../graphql/queries/Categories.gql')">
                <template slot-scope="{ result: { data, isLoading } }">
                    <div v-if="isLoading">Loading...</div>

                    <select
                        v-else
                        class="form-group"
                        v-model="category_id"
                        id="category"
                    >
                        <option
                            v-for="category of data.categories"
                            :key="category.id"
                            :value="category.id"
                        >
                            {{ category.name }}
                        </option>
                    </select>
                </template>
            </ApolloQuery>
            <div class="form-group">
                <button type="submit">Add book</button>
            </div>
        </form>
    </div>
</template>

<script>
import addBook from "../graphql/mutations/AddBook.gql";
export default {
    data() {
        return {
            title: "",
            author: "",
            image: "",
            link: "",
            featured: false,
            category_id: 1,
        };
    },

    methods: {
        addBook() {
            // Call to the graphql mutation
            this.$apollo
                .mutate({
                    // Query
                    mutation: addBook,
                    // Parameters
                    variables: {
                        title: this.title,
                        author: this.author,
                        description: this.description,
                        link: this.link,
                        featured: this.featured,
                        image: this.image,
                        category_id: this.category_id,
                    },
                })
                .then((data) => {
                    // Result
                    console.log(data);
                    this.$router.push('/');
                })
                .catch((error) => {
                    // Error
                    console.error(error);
                });
        },
    },
};
</script>
<style scoped>
.form-group {
    margin-bottom: 32px;
}

input[type="text"] {
    padding: 10px 14px;
}

button {
    padding: 16px;
    background: #027bff;
    color: white;
    border-radius: 5px;
    font-size: 16px;
}
</style>
