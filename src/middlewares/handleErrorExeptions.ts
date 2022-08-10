import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../helpers/ApiError'

export const handleErrorExeptions = (
  error: Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode ?? 500
  const message = error.statusCode ? error.message : 'Internal Server Error'

  console.error(`
    ${error.name} With Status Code ${statusCode}
    Stack: ${error.stack}
  `)

  return res.status(500).json({
    status: 'Error',
    statusCode,
    message
  })
}
