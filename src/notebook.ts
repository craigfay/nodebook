const cellDelimiter = '*endcell*'

// Convert a notebook into a format that can be run by the "run" module
function parse(notebook) {
  let dependencies
  const javascript = notebook.cells.map(cell => {
    if (cell.celltype == 'package') dependencies = cell.content
    if (cell.celltype == 'code') return cell.content
    else return `\nconsole.log("${cellDelimiter}")\n`
  })
  return { dependencies, javascript }
}

