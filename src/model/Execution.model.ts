export interface ExecutionRequest {
  type: string;
  params: number[];
}

export interface ExecutionResult {
  id: number;
  date: string;
  description: string;
  price: number;
  userBalance: number;
  result: string;
}
