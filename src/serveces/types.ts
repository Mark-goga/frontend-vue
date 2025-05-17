import { z } from 'zod';

export interface HttpError {
  status: number;
  message: string;
  data?: unknown;
}

export interface ApiResponse<T> {
  data: T;
}

export type HttpServiceResult<T> = T | { error: string };

export type MiddlewareOnError = (
  error: unknown,
  requestFn: () => Promise<any>,
  schema?: z.ZodType<any>
) => Promise<HttpServiceResult<any>>;

export type MiddlewareOnResponse = <T>(
  response: any,
  schema?: z.ZodType<T>
) => HttpServiceResult<T>;

export type MiddlewareBeforeRequest = () => void;
