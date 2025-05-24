import { z } from 'zod';
import {
  HttpError,
  HttpServiceResult,
  MiddlewareBeforeRequest,
  MiddlewareOnError,
  MiddlewareOnResponse,
} from '@/serveces/types';

export class HttpService {
  private readonly baseUrl: string;
  private readonly middlewareOnError?: MiddlewareOnError;
  private readonly middlewareBeforeRequest?: MiddlewareBeforeRequest;
  private readonly middlewareOnResponse?: MiddlewareOnResponse;
  private defaultHeaders: Record<string, string> = {};

  constructor(
    baseUrl: string,
    options?: {
      onError?: MiddlewareOnError;
      beforeRequest?: MiddlewareBeforeRequest;
      onResponse?: MiddlewareOnResponse;
    }
  ) {
    this.baseUrl = baseUrl;
    this.middlewareOnError = options?.onError;
    this.middlewareBeforeRequest = options?.beforeRequest;
    this.middlewareOnResponse = options?.onResponse;
  }

  setDefaultHeader(key: string, value: string): void {
    this.defaultHeaders[key] = value;
  }

  removeDefaultHeader(key: string): void {
    delete this.defaultHeaders[key];
  }

  private getHeaders(additionalHeaders?: Record<string, string>): HeadersInit {
    return {
      'Content-Type': 'application/json',
      ...this.defaultHeaders,
      ...additionalHeaders,
    };
  }

  private buildUrl(url: string, queryParams?: Record<string, string>): string {
    const fullUrl = `${this.baseUrl}${url}`;
    if (!queryParams) return fullUrl;

    const queryString = Object.entries(queryParams)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');

    return `${fullUrl}${fullUrl.includes('?') ? '&' : '?'}${queryString}`;
  }

  private async executeRequest<T>(
    url: string,
    options: RequestInit,
    queryParams?: Record<string, string>,
    schema?: z.ZodType<T>
  ): Promise<HttpServiceResult<T>> {
    const requestFn = async () => {
      this.middlewareBeforeRequest?.();

      if (options.headers && typeof options.headers === 'object') {
        options.headers = this.getHeaders(
          options.headers instanceof Headers
            ? undefined
            : (options.headers as Record<string, string>)
        );
      }
      const response = await fetch(this.buildUrl(url, queryParams), options);

      if (!response.ok) {
        const errorResponse: HttpError = {
          status: response.status,
          message: response.statusText,
        };

        const errorData = await response.json();
        errorResponse.data = errorData;
        if (errorData.message) {
          errorResponse.message = errorData.message;
        }

        throw errorResponse;
      }

      return await response.json();
    };

    try {
      const data = await requestFn();

      if (this.middlewareOnResponse) {
        return this.middlewareOnResponse(data, schema);
      }

      return data;
    } catch (error) {
      if (this.middlewareOnError) {
        return await this.middlewareOnError(error, requestFn, schema);
      }

      return {
        error: error instanceof Error ? error.message : 'Невідома помилка під час виконання запиту',
      };
    }
  }

  async get<T>(
    url: string,
    options?: {
      queryParams?: Record<string, string>;
      headers?: Record<string, string>;
      init?: Omit<RequestInit, 'method' | 'headers' | 'body'>;
      schema?: z.ZodType<T>;
    }
  ): Promise<HttpServiceResult<T>> {
    return this.executeRequest<T>(
      url,
      {
        method: 'GET',
        headers: this.getHeaders(options?.headers),
        credentials: 'include',
        ...options?.init,
      },
      options?.queryParams,
      options?.schema
    );
  }

  async post<T>(
    url: string,
    data: any,
    options?: {
      queryParams?: Record<string, string>;
      headers?: Record<string, string>;
      init?: Omit<RequestInit, 'method' | 'headers' | 'body'>;
      schema?: z.ZodType<T>;
    }
  ): Promise<HttpServiceResult<T>> {
    return this.executeRequest<T>(
      url,
      {
        method: 'POST',
        headers: this.getHeaders(options?.headers),
        body: JSON.stringify(data),
        credentials: 'include',
        ...options?.init,
      },
      options?.queryParams,
      options?.schema
    );
  }

  async put<T>(
    url: string,
    data: any,
    options?: {
      queryParams?: Record<string, string>;
      headers?: Record<string, string>;
      init?: Omit<RequestInit, 'method' | 'headers' | 'body'>;
      schema?: z.ZodType<T>;
    }
  ): Promise<HttpServiceResult<T>> {
    return this.executeRequest<T>(
      url,
      {
        method: 'PUT',
        headers: this.getHeaders(options?.headers),
        body: JSON.stringify(data),
        credentials: 'include',
        ...options?.init,
      },
      options?.queryParams,
      options?.schema
    );
  }

  async delete<T>(
    url: string,
    data: any,
    options?: {
      queryParams?: Record<string, string>;
      headers?: Record<string, string>;
      init?: Omit<RequestInit, 'method' | 'headers' | 'body'>;
      schema?: z.ZodType<T>;
    }
  ): Promise<HttpServiceResult<T>> {
    return this.executeRequest<T>(
      url,
      {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: this.getHeaders(options?.headers),
        credentials: 'include',
        ...options?.init,
      },
      options?.queryParams,
      options?.schema
    );
  }

  async patch<T>(
    url: string,
    data: any,
    options?: {
      queryParams?: Record<string, string>;
      headers?: Record<string, string>;
      init?: Omit<RequestInit, 'method' | 'headers' | 'body'>;
      schema?: z.ZodType<T>;
    }
  ): Promise<HttpServiceResult<T>> {
    return this.executeRequest<T>(
      url,
      {
        method: 'PATCH',
        headers: this.getHeaders(options?.headers),
        body: JSON.stringify(data),
        credentials: 'include',
        ...options?.init,
      },
      options?.queryParams,
      options?.schema
    );
  }
}
