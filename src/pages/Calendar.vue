<template>
    <div>
        <v-card>
            <v-card-text>
                <v-select
                        :items="employees"
                        label="Employee"
                        item-text="name"
                        item-value="id"
                        v-model="employeeId"
                ></v-select>
                <v-select
                        :items="months"
                        label="Month"
                        item-text="name"
                        item-value="id"
                        v-model="month"
                ></v-select>
            </v-card-text>
        </v-card>
        <v-card class="mt-3" v-if="month !== null && employeeId !== null">
            <v-card-text>
                <v-calendar
                        ref="calendar"
                        type="month"
                        color="primary"
                        :start="start"
                        :weekdays="[1,2,3,4,5,6,0]"
                        :show-month-on-first="false"
                >
                    <template v-slot:day="{ date }">
                        <template v-for="(event, index) in eventsMap[date]">
                            <div :key="index" :class="'dot ' + event.state"></div>
                        </template>
                    </template>
                </v-calendar>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import {db} from '../services/db'
    import _ from 'lodash'

    export default {
        data: function () {
            return {
                months: [],
                month: null,
                employees: [],
                employeeId: null,
                events: [],
                start: null
            }
        },
        watch: {
            date(date) {
                let employee = db.getEmployees()
                this.events = []
                for (let employeeItem of employee) {
                    let event = db.getEventForDateEmployee(date, employeeItem.id)
                    this.events.push({
                        employee: employeeItem,
                        state: event !== null ? event.state : null
                    })
                }
            },
            month(month){
                //this.$refs.calendar.scrollToTime()
                this.start = this.$moment(month, 'YYYY MMMM').format('YYYY-MM-DD')
                this.getEvents()
            },
            employeeId(){
                this.getEvents()
            }
        },
        created() {
            this.employees = db.getEmployees()
            this.months = this.getMonths()
            this.month = this.$moment().format('YYYY MMMM')
        },
        methods: {
            getMonths() {
                let months = []
                let lowerDate = null
                let higherDate = this.$moment()
                _.each(this.employees, (item) => {
                    if (lowerDate === null || this.$moment(item.contract_start).isBefore(lowerDate)) {
                        lowerDate = this.$moment(item.contract_start).startOf('month')
                    }
                    if (higherDate === null || this.$moment(item.contract_start).isAfter(higherDate)) {
                        higherDate = this.$moment(item.contract_start).endOf('month')
                    }
                })
                while (lowerDate.isBefore(higherDate)) {
                    months.push(lowerDate.format('YYYY MMMM'))
                    lowerDate.add(1, 'months')
                }
                return months
            },
            getEvents(){
                this.events = db.getEventsByEmployeeMonth(this.employeeId, this.$moment(this.month, 'YYYY MMMM').format('YYYY-MM'))
            },

        },
        computed: {
            eventsMap(){
                const map = {}
                this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
                return map
            }
        }
    }
</script>

<style>
    .dot{
        width: 8px;
        height: 8px;
        border-radius: 4px;
    }

    .Present{
        background-color: #388E3C;
    }

    .Absent{
        background-color: #D32F2F;
    }

    .Weekend{
        background-color: #FBC02D;
    }

    .Sick{
        background-color: #455A64;
    }
</style>