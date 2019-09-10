const base = { cells: [] }
const build = (...fns) => fns.reduce((v, f) => f(v), base)

function push(notebook, newCell) {
  const { cells, ...rest } = notebook
  return  { cells: [...cells, newCell], ...rest }
}



function packageCell(content) {
  return {
    cellType: 'package',
    content,
  }
}

function codeCell(content) {
  return {
    cellType: 'code',
    content,
  }
}

function textCell(content) {
  return {
    cellType: 'text',
    content,
  }
}

// function run(notebook) {
  // const codeCells = notebook.cells.filter(cell => cell.cellType == 'code')
  // const contents = codeCells.map(cell => cell.content)
  // eval(contents.join('\n' + 'console.log("*end_cell*")' + '\n'))
// }

const instance = build(
  notebook => push(notebook, codeCell('console.log(5)')),
  notebook => push(notebook, textCell('hello there')),
  notebook => push(notebook, codeCell('console.log(10)')),
)

run(instance)
