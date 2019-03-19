<template>
    <div>
        <v-card>
            <v-card-text>
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
                                v-model="date"
                                label="Select date to display events"
                                prepend-icon="event"
                                readonly
                                v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" @input="pickerMenu = false"></v-date-picker>
                </v-menu>
            </v-card-text>
        </v-card>
        <v-card v-if="events.length" class="mt-2">
            <div v-for="event in events" :key="event.employee.id">
                <v-card class="elevation-0">
                    <v-card-text>
                        <p>{{event.employee.name}}</p>
                    </v-card-text>
                </v-card>
            </div>
        </v-card>
    </div>
</template>

<script>
    import {db} from '../services/db'

    export default {
        data() {
            return {
                pickerMenu: false,
                date: null,
                events: []
            }
        },
        watch:{
            date(date){
                let employee = db.getEmployees()
                this.events = []
                for (let employeeItem of employee) {
                    let event = db.getEventForDateEmployee(date, employeeItem.id)
                    this.events.push({
                        employee: employeeItem,
                        state: event !== null ? event.state : null
                    })
                }
            }
        },
        methods: {

        }
    }
</script>