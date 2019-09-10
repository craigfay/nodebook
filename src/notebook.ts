const build = (...fns) => fns.reduce((v, f) => f(v), []);

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

const notebook = build(
  cells => push(cells, codeCell('console.log(5)')),
  cells => push(cells, codeCell('console.log(10)')),
)

console.log({ notebook })
