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
                                label="Select date to display states"
                                prepend-icon="event"
                                readonly
                                v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker first-day-of-week="1" v-model="date" @input="pickerMenu = false"></v-date-picker>
                </v-menu>
            </v-card-text>
        </v-card>
        <v-card v-if="events.length" class="mt-3">
            <template v-for="(event, index) in events">
                <div :key="index + 1000">
                    <v-card class="elevation-0">
                        <v-card-text>
                            <v-layout>
                                <v-flex xs6>
                                    <p class="event-text">{{event.employee.name}}</p>
                                </v-flex>
                                <v-flex xs6>
                                    <v-select
                                            :items="states"
                                            label="State"
                                            v-model="event.state"
                                            @change="changeEventType(event.employee.id, event.date, event.state)"
                                    ></v-select>
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                    </v-card>
                </div>
                <v-divider v-if="index + 1 !== events.length" :key="index"></v-divider>
            </template>
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
                events: [],
                states: [
                    'Present',
                    'Sick',
                    'Absent',
                    'Weekend'
                ],
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
                        state: event !== null ? event.state : null,
                        date: date
                    })
                }
            }
        },
        methods: {
            changeEventType(id, date, state){
                db.setEventForDateEmployee(id, date, state)
                db.setEventForDateEmployee(id, date, state)
            },
            getCurrentDate()
            {
                return this.$moment().format('YYYY-MM-DD')
            }
        },
        created(){
            this.date = this.getCurrentDate()
        }
    }
</script>

<style>
    .event-text{
        font-size: 16px;
        margin: 0;
    }
</style>