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
                        "contract_start": "2016-01-30"
                    },
                    {
                        "id": 1,
                        "name": "Alyse Rivelon",
                        "position": "Internal Auditor",
                        "contract_start": "2017-09-14"
                    },
                    {
                        "id": 2,
                        "name": "Laurens Lanon",
                        "position": "Developer IV",
                        "contract_start": "2016-03-23"
                    },
                    {
                        "id": 3,
                        "name": "Candra Tuppeny",
                        "position": "Web Designer III",
                        "contract_start": "2017-12-07"
                    },
                    {
                        "id": 4,
                        "name": "Elvira Olivey",
                        "position": "Systems Administrator III",
                        "contract_start": "2017-03-05"
                    },
                    {
                        "id": 5,
                        "name": "Carole Hutchason",
                        "position": "Assistant Professor",
                        "contract_start": "2018-01-21"
                    },
                    {
                        "id": 6,
                        "name": "Pat Kliesl",
                        "position": "Graphic Designer",
                        "contract_start": "2018-07-01"
                    },
                    {
                        "id": 7,
                        "name": "Lindi Dodswell",
                        "position": "VP Sales",
                        "contract_start": "2018-01-15"
                    },
                    {
                        "id": 8,
                        "name": "Zoe Cash",
                        "position": "Recruiting Manager",
                        "contract_start": "2018-03-05"
                    },
                    {
                        "id": 9,
                        "name": "Lani Pinch",
                        "position": "Senior Financial Analyst",
                        "contract_start": "2018-06-05"
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
    getEmployees(){
        return this.data.employee
    },
    getEmployeeById(id){
        return _.filter(this.data.employee, (item) => {
            return item.id === id
        })[0]
    },
    addEmployee(name, position, contract_start){
        let employees = this.getEmployees()
        let last = employees[employees.length - 1]
        this.data.employee.push({
            id: last.id + 1,
            name: name,
            position: position,
            contract_start: contract_start
        })
        this.commit()
    },
    deleteEmployee(id){
        this.data.employee = _.filter(this.data.employee, (item) => {
            return item.id !== id
        })
        this.commit()
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
    setEventForDateEmployee(id, date, state){
        let found = false
        this.data.events = _.map(this.data.events, (item) => {
            if(item.employee === id && item.date === date) {
                found = true
                item.state = state
            }
            return item
        })
        if(found){
            this.commit()
        } else {
            this.addEvent(id, date, state)
        }
    },
    addEvent(employeeId, date, state){
        this.data.events.push({
            employee: employeeId,
            date: date,
            state: state
        });
        this.commit()
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
    getEventsByEmployeeMonth(employeeId, month){
        return _.filter(this.data.events, (item) => {
            return item.date.startsWith(month) && item.employee === employeeId
        })
    }
}