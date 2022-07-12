import { ParamStruct } from "./models"

const inRange = (value: number, min: number, max: number) => value >= min && value <= max

const validateRange = (min: number, max: number) => (key: string, field: any) => inRange(field[key], min, max)

const validateOperationLength = (min: number, max: number) => (key: string, field: any) => inRange(field[key].length, min, max)

const validateOperationParamLength = (length: number) => (key: string, field: any) => field[key].every((op: number[]) => op.length === length)

const validateOperationRanges = (key: string, field: any) => field[key].every(([a, b]: number[]) => a >= 1 && a <= b && b <= field.arraySize)

const validateOperationSummands = (min: number, max: number) => (key: string, field: any) => field[key].every(([a, b, k]: number[]) => inRange(k, min, max))


export const validateParamConstraints = (p: ParamStruct) => {
  const constraints = [
    { key: 'arraySize', validator: validateRange(3, Math.pow(10, 7)), errorMsg: 'Requirement failed on array size: must be within 3 to 10^7' },
    { key: 'operations', validator: validateOperationLength(1, 2 * Math.pow(10, 5)), errorMsg: 'Requirement failed on operations size: must be within 1 to 2 * 10^8 operations' },
    { key: 'operations', validator: validateOperationParamLength(3), errorMsg: 'Requirement failed on operations params: every operation must have 3 number items as parameters' },
    { key: 'operations', validator: validateOperationRanges, errorMsg: 'Requirement failed on operations params: operation_start (operation[0]) must be 1 or less or equal than operation_end (operation[1]) and operation[1] must be less or equal than arraySize' },
    { key: 'operations', validator: validateOperationSummands(1, Math.pow(10, 9)), errorMsg: 'Requirement failed on operations param summand (operation[2]): it must be within 1 to 10^9' },
  ]
  
  for (const constraint of constraints) {
    if (!constraint.validator(constraint.key, p)) {
      throw new Error(constraint.errorMsg)
    }
  }
}