
function codeCell(source) {
  return {
    cellType: 'code',
    source,
  }
}

function run(cells) {
  const codeCells = cells.filter(cell => cell.cellType == 'code');
  const source = codeCells.map(cell => cell.source);
  eval(source.join('\n'));
}

function push(cells, newCell) {
  return [...cells, newCell]
}

const notebook = []
push(notebook, codeCell('console.log(5)'));
