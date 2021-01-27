<template>
    <v-card elevation="2" outlined shaped>
        <v-flex>
            <v-data-table
                :headers="headers"
                :items="livros"
                :loading="busy"
                loading-text="Loading... Please wait"
                sort-by="id"
                class="elevation-1"
            >
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title>My CRUD</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog" max-width="500px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    color="primary"
                                    dark
                                    class="mb-2"
                                    v-bind="attrs"
                                    v-on="on"
                                    elevation="2"
                                >
                                    New Item
                                </v-btn>
                            </template>
                            <template slot="items" slot-scope="props">
                                <td>{{ props.item.title }}</td>
                                <td>{{ props.item.id }}</td>
                                <td>{{ props.item.author }}</td>
                                <td>{{ props.item.category }}</td>
                            </template>
                            <template v-slot:[`item.featured`]="{ item }">
                                <span>{{item.featured ? 'Sim' : 'Não'}}</span>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">{{
                                        formTitle
                                    }}</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                    v-model="editedItem.title"
                                                    label="Title"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                                disable
                                            >
                                                <v-text-field
                                                    v-model="editedItem.id"
                                                    label="ID"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                    v-model="editedItem.author"
                                                    label="Author"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                    v-model="editedItem.image"
                                                    label="Image"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                    v-model="
                                                        editedItem.category
                                                    "
                                                    label="Category"
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="close"
                                    >
                                        Cancel
                                    </v-btn>
                                    <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="save"
                                    >
                                        Save
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-dialog v-model="dialogDelete" max-width="500px">
                            <v-card>
                                <v-card-title class="headline"
                                    >Are you sure you want to delete this
                                    item?</v-card-title
                                >
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="closeDelete"
                                        >Cancel</v-btn
                                    >
                                    <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="deleteItemConfirm"
                                        >OK</v-btn
                                    >
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <!-- <router-link type="button"
                            :to="`/books/${item.id}/edit`">
                            
            <v-icon small class="mr-2" @click="editItem(item)" color="pink">
                mdi-pencil
            </v-icon></router-link> -->
                    <v-icon small @click="editItem(item)">
                        mdi-pencil
                    </v-icon>
                    <v-icon small @click="deleteItem(item)">
                        mdi-delete
                    </v-icon>
                </template>
            </v-data-table>
        </v-flex>
    </v-card>
</template>

<script>
import BOOKS from "../graphql/queries/Books.gql";
import updateBook from "../graphql/mutations/UpdateBook.gql";
export default {
    data: () => ({
        dialog: false,
        dialogDelete: false,
        teste: "sim",
        busy: true,
        headers: [
            {
                text: "Livros",
                align: "start",
                sortable: false,
                value: "title",
            },
            { text: "ID", value: "id" },
            { text: "Author", value: "author" },
            { text: "Category", value: "category" },
            { text: "Featured", value: "featured" },
            { text: "Actions", value: "actions", sortable: false },
        ],
        livros: [],
        editedIndex: -1,
        editedItem: {
            id: 0,
            title: "",
            author: "",
            image: "",
            category: "",
            featured: false,
            description: "",
            link: "",
        },
        defaultItem: {
            title: "",
            author: "",
            image: "",
            category: "",
            featured: false,
            description: "",
            link: "",
        },
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "Novo Item" : "Editar Item";
        },
    },

    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        },
    },

    created() {
        this.getAll();
    },

    methods: {
        async getAll() {
            const result = await this.$apollo.query({
                query: BOOKS,
            });
            this.livros = result.data.books;
            this.busy = false;
        },

        editItem(item) {
            this.editedIndex = this.livros.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            this.editedIndex = this.livros.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
        },

        deleteItemConfirm() {
            this.livros.splice(this.editedIndex, 1);
            this.closeDelete();
        },

        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        save() {
            if (this.editedIndex > -1) {
                this.$apollo
                    .mutate({
                        // Query
                        mutation: updateBook,
                        // Parameters
                        variables: {
                            id: this.editedItem.id,
                            title: this.editedItem.title,
                            author: this.editedItem.author,
                            description: this.editedItem.description,
                            link: this.editedItem.link,
                            featured: this.editedItem.featured,
                            image: this.editedItem.image,
                            category_id: 1,
                        },
                    })
                    .then((data) => {
                        // Result
                        console.log(data);

                        //this.$router.push(`/books/${this.$route.params.id}`);
                    })
                    .catch((error) => {
                        // Error
                        console.error(error);
                    });
               t;
            } else {
                this.livros.push(this.editedItem);
            }
            this.close();
        },

        
    },
};
</script>

<style lang="stylus" scoped></style>
