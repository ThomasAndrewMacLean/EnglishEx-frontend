<template lang="html">
    <section>
        <h1 class="title">Add Category</h1>
        <p class="level">
            Here we can add Categories. A category groupes a bunch of courses, that in their turn group
            exercises.
            <!-- <span class="icon has-text-info tooltip is-tooltip-multiline" data-tooltip="Remember to alert the webmaster if you added a new label, to describe where it should go.">
                <i class="fas fa-info-circle"></i>
      </span>-->
        </p>
        <form @submit.prevent="addCategory">
            <div class="field">
                <div class="control">
                    <label class="label" for="category">category:</label>
                    <div v-if="error" class="notification is-danger">
                        <button @click.prevent="error = null" class="delete"></button>
                        {{error}}
                    </div>
                    <input @blur="checkCategory" class="input is-radiusless" id="category" type="text"
                        placeholder="category" v-model="category.name" required>
                </div>
            </div>
            <button type="submit" class="button is-primary is-radiusless">Add Category</button>
        </form>
        <br>
        <br>
        <table class="table table is-bordered is-hoverable">
            <thead>
                <tr>
                    <th>Existing Categories</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="category in categories" :key="category._id">
                    <td class="td-no-padding" @click="selectedCategory = category">
                        <div :class="selectedCategory === category ? 'active-category td-padding':'td-padding'">
                            {{category.name}}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <br>
        <button v-if="selectedCategory" @click="updateCategory" class="button is-primary is-radiusless">SAVE</button>
        <br>
        <br>
        <label v-if="selectedCategory" class="checkbox">
            <input type="checkbox" v-model="selectedCategory.showOnHomePage">
            Show this category on homepage?
        </label>
        <br>

        <div v-if="selectedCategory" class="control">
            <label class="label" for="categoryNameEdit">edit name of category:</label>
            <input class="input is-radiusless" id="categoryNameEdit" type="text" v-model="selectedCategory.name"
                required>
        </div>
        <br>

        <div v-if="selectedCategory" class="control">
            <label class="label" for="categoryInfo">add info for the category:</label>
            <input class="input is-radiusless" id="categoryInfo" type="text" v-model="selectedCategory.info"
                required>
        </div>
        <br>

        <p v-if="selectedCategory" class="level">
            Select the courses that are part of the category
        </p>
        <table v-if="selectedCategory" class="table table is-bordered is-hoverable">
            <thead>
                <tr>
                    <th>Courses</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="course in courses" :key="course._id">
                    <td class="td-no-padding" @click="addCourseToCategory(course._id)">
                        <div
                            :class="!!selectedCategory.courses.includes(course._id) ? 'active-category td-padding':'td-padding'">

                            {{course.title}}
                            <p class="is-size-7 is-family-secondary"> {{course.description}}</p>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <button v-if="selectedCategory" @click="updateCategory" class="button is-primary is-radiusless">SAVE</button>

    </section>
</template>

<script>
export default {
    data() {
        return {
            category: {
                showOnHomePage: true,
                courses: []
            },
            selectedCategory: null,
            error: null
        };
    },
    computed: {
        categories() {
            return this.$store.getters.getCategories;
        },
        courses() {
            return this.$store.getters.getCourses;
        }
    },
    methods: {
        updateCategory() {
            this.$store.dispatch('updateCategory', {
                category: this.selectedCategory
            });
        },
        addCourseToCategory(courseId) {
            if (this.selectedCategory.courses.includes(courseId)) {
                this.selectedCategory.courses.splice(
                    this.selectedCategory.courses.indexOf(courseId),
                    1
                );
            } else {
                this.selectedCategory.courses.push(courseId);
            }
        },
        addCategory() {
            this.$store.dispatch('addCategory', {
                category: this.category
            });
        },
        checkCategory() {
            if (this.category.name) {
                if (
                    this.categories.filter(l => l.name === this.category.name)
                        .length > 0
                ) {
                    this.error = `The category ${
                        this.category.name
                    } allready exists!`;
                    this.category.name = null;
                    document.getElementById('category').focus();
                    return;
                }
                this.error = null;
            }
        }
    },
    mounted() {
        this.$store.dispatch('getCategories');
        this.$store.dispatch('getCourses');
    }
};
</script>

<style scoped>
.active-category {
    border-left-style: solid;
    border-left-width: 1rem !important;
    border-left-color: #fa7c91;
}

.td-padding {
    padding: 8px 12px;
}

.td-no-padding {
    cursor: pointer;
    padding: 0;
}
</style>
