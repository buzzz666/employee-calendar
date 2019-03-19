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
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" @click="showDeleteModal = true">Delete</v-btn>
            </v-card-actions>
        </v-card>

        <v-dialog
                v-model="showDeleteModal"
        >
            <v-card tile>
                <v-toolbar card dark color="primary">
                    <v-toolbar-title>Delete Employee</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <p>Are you sure want to delete {{ employee.name }}?</p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="deleteEmployee" color="primary">delete</v-btn>
                    <v-btn @click="showDeleteModal = false" color="secondary">cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import {db} from '../services/db'

    export default {
        data() {
            return {
                employee: null,
                showDeleteModal: false
            }
        },
        created(){
            this.employee = db.getEmployeeById(parseInt(this.$route.params.id))
        },
        methods: {
            deleteEmployee(){
                db.deleteEmployee(this.employee.id)
                this.$router.push('/employees')
            }
        }
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