import { Meteor } from 'meteor/meteor'
import { Employees } from '../imports/collections/employees'
import _ from 'lodash'
import {image, helpers} from 'faker'

Meteor.startup(() => {
  //check if collection has records
  const recordsAmt = Employees.find({}).count()
  if (!recordsAmt) {
    //generate data
    _.times(100, () => {
      const { name, email, phone } = helpers.createCard()
      Employees.insert({
        name, email, phone,
        image: image.people()
      })
    })
  }
  Meteor.publish('employees', (per_page) => Employees.find({}, {limit: per_page}))
})
