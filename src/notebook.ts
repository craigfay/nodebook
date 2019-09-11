const cellDelimiter = '*endcell*'

// Convert a notebook into a format that can be run by the "run" module
export function parse(notebook) {
  let dependencies

  const javascript = notebook.cells.map(cell => {
    if (cell.celltype == 'package') dependencies = cell.content
    return cell.celltype == 'code' ? cell.content : ''
  }).join(`\nconsole.log("${cellDelimiter}")\n`)

  return { dependencies, javascript }
}

