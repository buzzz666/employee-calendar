<template>
    <div>
        <v-btn
                to="/employees"
                class="back"
                small
                flat
        >
            <v-icon size="32">arrow_back</v-icon>
            <p class="back-text">back</p>
        </v-btn>
        <v-card class="profile">
            <v-card-text class="profile-body">
                <v-avatar size="80">
                    <v-icon size="80" color="primary">account_circle</v-icon>
                </v-avatar>
                <div class="info-text">
                    <h3>{{ employee.name }}</h3>
                    <p>{{ employee.position }}</p>
                    <p>Contract started on: {{ employee.contract_start }}</p>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import {db} from '../services/db'

    export default {
        data() {
            return {
                employee: null
            }
        },
        created(){
            this.employee = db.getEmployeeById(parseInt(this.$route.params.id))
        },
    }
</script>

<style>
    .profile-body{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .info-text{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .back{
        margin: 0 0 10px -8px;
        display: flex;
        justify-content: center;
        width: 90px;
    }

    .back-text{
        margin: 0;
    }
</style>