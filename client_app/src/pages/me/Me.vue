<script setup>
import handleErrorMixin from '../../components/mixins/HandleErrorMixin'
import UserVue from '../../components/users/User.vue';
import UserScopesVue from '../../components/users/UserScopes.vue';
</script>

<script>

export default {
    mixins: [handleErrorMixin],
    props: ['userid'],
    data() {
        return {
            showLoading: false,
            message: null,
        };
    },
    methods: {
    }
}
</script>

<template>
<div class="container">
    <div class="container text-center">
        <div class="row">
            <div class="col">
                <h1>{{ message }}</h1>
            </div>
        </div>
    </div>

    <div class="container text-center">
        <div class="row">
            <UserVue userid="me"></UserVue>
        </div>
    </div>

    <div class="container text-center">
        <div class="row">
            <UserScopesVue userid="me" :readonly="true"></UserScopesVue>
        </div>
    </div>
    
</div>
</template>