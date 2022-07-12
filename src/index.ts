import { Crush } from "./crush"

/* const params = {
  arraySize: 10,
  operations: [
    [1, 5, 3],
    [4, 8, 7],
    [6, 9, 1],
  ]
}
const params = {
  arraySize: 5,
  operations: [
    [1, 2, 100],
    [2, 5, 100],
    [3, 4, 100],
  ],
} */
const params = {
  arraySize: 10,
  operations: [
    [2, 6, 8],
    [3, 5, 7],
    [1, 8, 1],
    [5, 9, 15],
  ],
}

try {
  const crushOps = new Crush(params)
  crushOps.crush()
  console.log(crushOps.findMaxItem())  
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message)
    process.exit()
  }
}
