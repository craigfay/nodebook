const build = (...fns) => fns.reduce((v, f) => f(v), []);

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

function run(cells) {
  const codeCells = cells.filter(cell => cell.cellType == 'code');
  const contents = codeCells.map(cell => cell.content);
  eval(contents.join('\n'));
}

function push(cells, newCell) {
  return [...cells, newCell]
}

const notebook = build(
  cells => push(cells, codeCell('console.log(5)')),
  cells => push(cells, codeCell('console.log(10)')),
)

console.log({ notebook })
