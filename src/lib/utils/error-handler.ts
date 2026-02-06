const POSTGRES_ERROR_CODES = {
  UNIQUE_VIOLATION: "23505",
  FOREIGN_KEY_VIOLATION: "23503",
  NOT_NULL_VIOLATION: "23502",
  CHECK_VIOLATION: "23514",
} as const;

const ERROR_CODE_MAP = {
  [POSTGRES_ERROR_CODES.UNIQUE_VIOLATION]: "DUPLICATE_ENTRY",
  [POSTGRES_ERROR_CODES.NOT_NULL_VIOLATION]: "VALIDATION_ERROR",
  [POSTGRES_ERROR_CODES.FOREIGN_KEY_VIOLATION]: "REFERENCE_ERROR",
  [POSTGRES_ERROR_CODES.CHECK_VIOLATION]: "VALIDATION_ERROR",
} as const;

interface PostgresError {
  code?: string;
  constraint_name?: string;
  detail?: string;
  message?: string;
  severity?: string;
  table_name?: string;
  schema_name?: string;
}

interface DrizzleErrorWithCause extends Error {
  cause?: PostgresError;
}

export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    constraint?: string;
    detail?: string;
  };
}

export interface DrizzleErrorInfo {
  code?: string;
  constraintName?: string;
  detail?: string;
  message?: string;
  pgError?: PostgresError;
}

export function getDrizzleErrorInfo(error: unknown): DrizzleErrorInfo {
  const drizzleError = error as DrizzleErrorWithCause;
  const pgError = drizzleError?.cause;

  return {
    code: pgError?.code,
    constraintName: pgError?.constraint_name,
    detail: pgError?.detail,
    message: pgError?.message || (error instanceof Error ? error.message : "An unexpected error occurred"),
    pgError,
  };
}

export function handleDrizzleError(error: unknown): ErrorResponse {
  const drizzleError = error as DrizzleErrorWithCause;
  const pgError = drizzleError?.cause;

  if (pgError?.code && pgError.code in ERROR_CODE_MAP) {
    return {
      success: false,
      error: {
        code: ERROR_CODE_MAP[pgError.code as keyof typeof ERROR_CODE_MAP],
        message: pgError.detail || pgError.message || "Database constraint violation",
        constraint: pgError.constraint_name,
        detail: pgError.detail,
      },
    };
  }

  return {
    success: false,
    error: {
      code: "DATABASE_ERROR",
      message: error instanceof Error ? error.message : "An unexpected error occurred",
    },
  };
}


