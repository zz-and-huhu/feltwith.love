interface D1Database {
  prepare: (query: string) => D1PreparedStatement;
  dump: () => Promise<ArrayBuffer>;
  batch: (statements: D1PreparedStatement[]) => Promise<D1Result[]>;
  exec: (query: string) => Promise<D1Result>;
}

interface D1PreparedStatement {
  bind: (...values: any[]) => D1PreparedStatement;
  first: <T = any>(colName?: string) => Promise<T | null>;
  run: () => Promise<D1Result>;
  all: <T = any>() => Promise<T[]>;
  raw: <T = any>() => Promise<T[]>;
}

interface D1Result {
  success: boolean;
  error?: string;
  results?: any[];
  lastRowId: number | null;
  changes: number;
}

declare global {
  interface Env {
    DB: D1Database;
    BUCKET: R2Bucket;
  }
}

export { Env };
