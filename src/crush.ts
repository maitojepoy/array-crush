import { Operations, ParamStruct } from './models'
import { validateParamConstraints } from './constraints'

export class Crush {
  private canvas: number[]
  private readonly operations: Operations

  constructor(params: ParamStruct) {
    validateParamConstraints(params)
    const { arraySize, operations } = params
    this.canvas = Array(arraySize).fill(0)
    this.operations = operations
  }

  public crush() {
    for (const [min, max, value] of this.operations) {
      for (let i = min - 1; i < max; i++) {
        this.canvas[i] = this.canvas[i] + value
      }
    }
  }

  public findMaxItem() {
    return Math.max(...this.canvas)
  }
}
