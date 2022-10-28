<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="10" class="mx-auto">
        <v-card class="pa-5">
          <v-card-title>Edit Your Post</v-card-title>
          <v-divider></v-divider>
          <v-form
            @submit.prevent="updateForm"
            ref="form"
            class="pa-5"
            enctype="multipart/form-data"
          >
            <v-text-field
              label="Title"
              prepend-icon="mdi-note"
              :rules="rules"
              v-model="post.title"
            ></v-text-field>
            <v-text-field
              label="Category"
              prepend-icon="mdi-view-list"
              :rules="rules"
              v-model="post.category"
            ></v-text-field>
            <v-textarea
              label="content"
              prepend-icon="mdi-note-plus"
              :rules="rules"
              v-model="post.content"
            ></v-textarea>
            <v-file-input
              @change="selectFile"
              show-size
              counter
              multiple
              label="Select Image"
            ></v-file-input>
            <v-img
              :src="post.image"
              width="120"
              v-if="post.image && !image.name"
            />
            <v-btn type="submit" class="mt-3" color="success"
              >Update Post</v-btn
            >
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import API from "@/api";

export default {
  data() {
    return {
      rules: [(value) => !!value || "this field is required"],
      post: {},
      image: {},
    };
  },
  async created() {
    const response = await API.getPostByID(this.$route.params.id);
    this.post = response;
  },
  methods: {
    selectFile(event) {
      console.log(event[0]);
      this.image = event[0];
      console.log(this.image);
    },
    async updateForm() {
      const formData = new FormData();
      formData.append("title", this.post.title);
      formData.append("content", this.post.content);
      formData.append("category", this.post.category);
      if (this.image.name) {
        formData.append("image", this.image);
      }
      if (this.$refs.form.validate()) {
        const response = await API.updatePost(this.$route.params.id, formData);
        this.$router.push({
          name: "home",
          params: { message: response.message },
        });
      }
    },
  },
};
</script>
