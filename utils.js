const Table = require('cli-table3')
const chalk = require('chalk')

const table = new Table({
  head: ['name', 'repository', 'branch'],
  style: {
    head: ['green']
  }
})

const listTable = (templates, lyric) => {
  const names = Object.keys(templates)
  names.forEach((name) => {
    table.push([name, templates[name].repository, templates[name].branch])
  })
  console.log(table.toString())
  if (lyric) {
    console.log(chalk.green(`\u2714 ${lyric}`))
  }
  process.exit()
}

module.exports = { listTable }
