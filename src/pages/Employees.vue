<template>
    <div>
        <v-card v-for="employee in employees" :to="'employee/' + employee.id" :key="employee.id" class="elevation-1">
            <v-card-text class="link-body mb-2">
                <v-icon medium>account_circle</v-icon>
                <div class="link-text ml-3">
                    <h3>{{ employee.name }}</h3>
                    <p>{{ employee.position }}</p>
                </div>
            </v-card-text>
        </v-card>
        <v-fab-transition>
            <v-btn
                    v-show="!showAddModal"
                    @click="addEmployee"
                    color="primary"
                    fixed
                    bottom
                    right
                    fab
            >
                <v-icon>add</v-icon>
            </v-btn>
        </v-fab-transition>
        <v-dialog
                v-model="showAddModal"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
                scrollable
        >
            <v-card tile>
                <v-toolbar card dark color="primary">
                    <v-btn icon dark @click="showAddModal = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Add Employee</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    <v-text-field
                            label="Name"
                            v-model="add.name"
                    ></v-text-field>
                    <v-text-field
                            label="Position"
                            v-model="add.position"
                    ></v-text-field>
                    <v-menu
                            v-model="pickerMenu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    v-model="add.contract_start"
                                    label="Contract start date"
                                    prepend-icon="event"
                                    readonly
                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="add.contract_start" @input="pickerMenu = false"></v-date-picker>
                    </v-menu>
                    <v-btn @click="addNew" color="primary" :disabled="!valid">Add</v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import {db} from '../services/db'

    export default {
        data() {
            return {
                employees: [],
                showAddModal: false,
                pickerMenu: false,
                add: {
                    name: '',
                    position: '',
                    contract_start: ''
                }
            }
        },
        created(){
            this.employees = db.getEmployees()
        },
        methods: {
            addEmployee(){
                this.add = {
                    name: '',
                    position: '',
                    contract_start: ''
                }
                this.showAddModal = true
            },
            addNew(){
                db.addEmployee(this.add.name, this.add.position, this.add.contract_start)
                this.showAddModal = false
            }
        },
        computed: {
            valid(){
                return this.add.name !== '' && this.add.position !== '' && this.add.contract_start !== ''
            }
        }
    }
</script>

<style>
    .link-body{
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .link-text h3{
        font-weight: 500;
    }

    .link-text p{
        font-size: 10px;
    }

    .link-text h3, .link-text p{
        margin: 0;
    }
</style>