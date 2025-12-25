export interface Question {
  id: number;
  question: string;
  options: string[];
  responses: string[];
}

export interface UserProgress {
  currentStep: number;
  userName: string;
  answers: Record<number, string>;
  completed: boolean;
}
