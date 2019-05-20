const Metalsmith = require('metalsmith')
const { resolve } = require('path')
const { prompt } = require('inquirer')
const compile = require('handlebars').compile
const processDir = process.cwd()

const question = [
  {
    type: 'input',
    name: 'folderPath',
    message: 'path of your Map folder:',
    default: '/map',
    validate(val) {
      if (!val) {
        return 'path is required!'
      } else {
        return true
      }
    }
  }
]

const plugin = (file) => {
  return (files, metalsmith, done) => {
    const { name, data, rename } = file
    const content = files[name].contents.toString()
    const template = compile(content)
    files[name].contents = template(data)
    if (rename) {
      files[rename] = files[name]
      delete files[name]
    }
    metalsmith.destination(resolve(processDir + file.dist)).clean(true)
    done()
  }
}

const ignore = (fileMap, fileName, folderPath) => {
  const ignoreList = [resolve(processDir + folderPath + '/map.js')]
  fileMap.forEach((file) => {
    if (file.name !== fileName) {
      ignoreList.push(resolve(processDir + folderPath + '/' + file.name))
    }
  })
  return ignoreList
}

module.exports = prompt(question).then(({ folderPath }) => {
  const fileMap = require(resolve(processDir + folderPath + '/map.js'))
  fileMap.forEach((file) => {
    Metalsmith(__dirname)
      .source(resolve(processDir + folderPath))
      .ignore(ignore(fileMap, file.name, folderPath))
      .use(plugin(file))
      .build((err) => {
        if (err) {
          throw err
        }
      })
  })
})
