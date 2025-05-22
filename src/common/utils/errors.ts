import { z } from 'zod';

export const getErrorMessageFromZod = (error: z.ZodError): string => {
  return error.issues
    .map((e) => {
      if (e.path.length > 0) {
        return `${e.path.join('.')} - ${e.message}`;
      }
      return e.message;
    })
    .join(', ');
};
