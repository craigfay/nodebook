const cellDelimiter = '*endcell*'

export function getDependencies(notebook) {
  return notebook.cells.find(cell => cell.celltype == 'package').content
}

export function getExecutable(notebook) {
  const codeCells = notebook.cells.filter(cell => cell.celltype == 'code')
  const contents = codeCells.map(cell => cell.content)
  return contents.join(`\nconsole.log("${cellDelimiter}")\n`)
}

export function splitExecutionIntoCells(execution) {
  return execution.split(cellDelimiter)
}




