const { prompt } = require('inquirer')
const chalk = require('chalk')
const download = require('download-git-repo')
const ora = require('ora')

const templates = require('../templates')

const question = [
  {
    type: 'input',
    name: 'name',
    message: 'the name of template:',
    validate(val) {
      if (val === '') {
        return 'name is required!'
      } else if (!templates[val]) {
        return 'this template does not exists!'
      } else {
        return true
      }
    }
  },
  {
    type: 'input',
    name: 'project',
    message: 'the name of project:',
    validate(val) {
      if (val === '') {
        return 'project name is required!'
      } else {
        return true
      }
    }
  },
  {
    type: 'input',
    name: 'dir',
    message: 'where to initial the project:',
    default: './'
  }
]

module.exports = prompt(question).then(({ name, project, dir }) => {
  const gitRepository = templates[name].repository
  const gitBranch = templates[name].branch
  const spinner = ora('downloading...')

  spinner.start()

  download(gitRepository + '#' + gitBranch, dir + '/' + project, (err) => {
    if (err) {
      console.log(chalk.red(err))
      process.exit()
    }
    spinner.stop()
    console.log(chalk.green('initial successfully!'))
  })
})
