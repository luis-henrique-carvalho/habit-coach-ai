export type ActionError = {
  code:
    | "VALIDATION_ERROR"
    | "NOT_FOUND"
    | "UNAUTHORIZED"
    | "ALREADY_EXISTS"
    | "TIER_LIMIT_EXCEEDED"
    | "ARCHIVED"
    | "DATABASE_ERROR"
    | "INVALID_DATE";
  message: string;
};

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: ActionError };