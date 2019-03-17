import _ from 'lodash'

export const db = {
    data: null,
    ready(){
        let stored = window.localStorage.getItem('database')
        if(stored === null){
            this.data = {
                employee: [
                    {
                        "id": 0,
                        "name": "Minor Treleven",
                        "position": "Systems Administrator II",
                        "contact_start": "2016-01-30"
                    },
                    {
                        "id": 1,
                        "name": "Alyse Rivelon",
                        "position": "Internal Auditor",
                        "contact_start": "2017-09-14"
                    },
                    {
                        "id": 2,
                        "name": "Laurens Lanon",
                        "position": "Developer IV",
                        "contact_start": "2016-03-23"
                    },
                    {
                        "id": 3,
                        "name": "Candra Tuppeny",
                        "position": "Web Designer III",
                        "contact_start": "2017-12-07"
                    },
                    {
                        "id": 4,
                        "name": "Elvira Olivey",
                        "position": "Systems Administrator III",
                        "contact_start": "2017-03-05"
                    },
                    {
                        "id": 5,
                        "name": "Carole Hutchason",
                        "position": "Assistant Professor",
                        "contact_start": "2018-01-21"
                    },
                    {
                        "id": 6,
                        "name": "Pat Kliesl",
                        "position": "Graphic Designer",
                        "contact_start": "2018-07-01"
                    },
                    {
                        "id": 7,
                        "name": "Lindi Dodswell",
                        "position": "VP Sales",
                        "contact_start": "2018-01-15"
                    },
                    {
                        "id": 8,
                        "name": "Zoe Cash",
                        "position": "Recruiting Manager",
                        "contact_start": "2018-03-05"
                    },
                    {
                        "id": 9,
                        "name": "Lani Pinch",
                        "position": "Senior Financial Analyst",
                        "contact_start": "2018-06-05"
                    }
                ],
                events: [
                    {
                        "employee": 9,
                        "date": "2019-03-01",
                        "state": "Present"
                    }
                ]
            }
        } else {
            this.data = JSON.parse(stored)
        }
    },
    commit(){
        window.localStorage.setItem('database', JSON.stringify(this.data))
    },
    getEmployee(){
        return this.data.employee
    },
    getEventsForDate(date){
        return _.filter(this.data.events, (item) => {
            return item.date === date
        })
    },
    getEventForDateEmployee(date, employeeId){
        let found = _.filter(this.data.events, (item) => {
            return item.date === date && item.employee === employeeId
        })
        return found.length > 0 ? found[0] : null
    },
    setEvent(employeeId, date, state){
        let exists = this.getEventForDateEmployee(date, employeeId)
        if(exists === null){
            this.data.events.push({
                'employee': employeeId,
                'date': date,
                'state': state,
            })
        } else {
            _.map(this.data.events, (item) => {
                if(item.employee === employeeId && item.date === date){
                    item.state = state
                }
            })
        }
        this.commit()
    },
}