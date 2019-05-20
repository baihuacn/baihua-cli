const { prompt } = require('inquirer')
const { writeFile } = require('fs')
const { resolve } = require('path')
const { listTable } = require('../utils')
const templates = require('../templates')

const question = [
  {
    type: 'input',
    name: 'name',
    message: 'name:',
    validate(val) {
      if (templates[val]) {
        return 'the name is existed'
      } else if (val === '') {
        return 'name is required!'
      } else {
        return true
      }
    }
  },
  {
    type: 'input',
    name: 'repository',
    message: 'repository:',
    validate(val) {
      if (val === '') {
        return 'repository is required!'
      } else {
        return true
      }
    }
  },
  {
    type: 'input',
    name: 'branch',
    message: 'branch:',
    default: 'master'
  }
]

module.exports = prompt(question).then(({ name, repository, branch }) => {
  templates[name] = { repository, branch }

  writeFile(resolve(__dirname, '../templates.json'), JSON.stringify(templates), 'utf-8', (err) => {
    if (err) {
      console.log(err)
    }
    listTable(templates, 'add successfully!')
  })
})
