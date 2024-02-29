import { Request, Response } from 'express';
import React from 'react';
import type { QueryObject } from 'ufo';

declare global {
  declare type PageContent = (() => React.JSX.Element) | Promise<() => React.JSX.Element>;

  declare type PageParams<T> = {
    params: T;
    query: QueryObject;
  };

  declare type PageContext = {
    req: Request;
    res: Response;
    extra?: Record<string, unknown>;
  };

  type Page<T> = (
    params?: PageParams<T>,
    context?: PageContext,
  ) => PageContent;
}

export {};