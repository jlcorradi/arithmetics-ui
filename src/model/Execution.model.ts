export interface IExecutionRequest {
  type: string;
  params: number[];
}

export interface IExecutionResult {
  id: number;
  date: string;
  description: string;
  price: number;
  userBalance: number;
  result: string;
}
