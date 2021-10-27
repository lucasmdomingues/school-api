import { AppError } from '../../../../domain/error.model';

export const errorMiddleware = (err, req, res, next) => {
  if (err instanceof AppError) {
    const { message, details, statusCode } = err;

    return res.status(statusCode).json({ message, details });
  }

  return res.status(500).json({
    message: 'Internal Server Error',
    details: [err.message],
  });
};
