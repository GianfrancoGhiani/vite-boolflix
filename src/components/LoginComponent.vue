<template>
    <section class="profile container">
        <img :src="user" :alt="user" @click="select()">
        <select name="profile-img" id="pro-pic" v-model="user">
            <option v-for="(account, index) in store.accountsImg" :key="index" :value="account">Account nr:{{
                    index
            }}
            </option>
        </select>
    </section>
</template>

<script>
import { store } from '../assets/store';
export default {
    name: 'LoginComponent',
    data() {
        return {
            store,
            user: 'https://ia903404.us.archive.org/31/items/profiles_202104/dog.png',
        }
    },
    methods: {
        select() {
            store.account = this.user;
            store.display = true;
        }
    },
}
</script>

<style lang="scss" scoped>
@use '../assets/style/partials/mixin.scss' as *;
@use '../assets/style/partials/variables.scss' as *;

.profile {
    @include flexcol;
    align-items: center;
    margin-top: 15rem;

    img {
        width: 100px;
        height: 100px;
        border-radius: .5rem;
        margin: 1rem;
    }

    select {
        width: 100px;
    }
}
</style>