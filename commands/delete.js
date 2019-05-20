const { prompt } = require('inquirer')
const { writeFile } = require('fs')
const { resolve } = require('path')
const { listTable } = require('../utils')
const templates = require('../templates')

const question = [
  {
    type: 'input',
    name: 'name',
    message: 'the name of the template you want to delete:',
    validate(val) {
      if (!templates[val]) {
        return 'the template does not existed!'
      } else if (val === '') {
        return 'name is required!'
      } else {
        return true
      }
    }
  }
]

module.exports = prompt(question).then(({ name }) => {
  delete templates[name]

  writeFile(resolve(__dirname, '../templates.json'), JSON.stringify(templates), 'utf-8', (err) => {
    if (err) {
      console.log(err)
    }
    listTable(templates, 'delete successfully!')
  })
})
