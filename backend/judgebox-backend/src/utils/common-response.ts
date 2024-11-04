import { HttpException, HttpStatus } from '@nestjs/common';

export interface SuccessResponse<T> {
    success: true;
    message: string;
    data: T;
    timestamp: string;
    statusCode: number;
}

export interface ErrorResponse {
    success: false;
    message: string;
    error: any;
    timestamp: string;
    statusCode: number;
}

export interface PaginatedResponse<T> {
    success: boolean;
    message: string;
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
    timestamp: string;
    statusCode: number;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

/**
 * Creates a standardized API response
 * @param success - Indicates if the operation was successful
 * @param message - Response message
 * @param payload - Data payload or error details
 * @param statusCode - HTTP status code (optional)
 */
export function commonResponse<T>(
    success: boolean,
    message: string,
    payload?: T,
    statusCode: number = success ? HttpStatus.OK : HttpStatus.BAD_REQUEST
): ApiResponse<T> {
    const timestamp = new Date().toISOString();

    if (success) {
        return {
            success: true,
            message,
            data: payload as T,
            timestamp,
            statusCode,
        };
    }

    return {
        success: false,
        message,
        error: payload,
        timestamp,
        statusCode,
    };
}

/**
 * Creates a standardized paginated response
 * @param success - Indicates if the operation was successful
 * @param message - Response message
 * @param data - Array of items
 * @param total - Total number of items
 * @param page - Current page number
 * @param pageSize - Number of items per page
 * @param statusCode - HTTP status code (optional)
 */
export function paginatedResponse<T>(
    success: boolean,
    message: string,
    data: T[],
    total: number,
    page: number,
    pageSize: number,
    statusCode: number = HttpStatus.OK
): PaginatedResponse<T> {
    const totalPages = Math.ceil(total / pageSize);
    const timestamp = new Date().toISOString();

    return {
        success,
        message,
        data,
        total,
        page,
        pageSize,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
        timestamp,
        statusCode,
    };
}

/**
 * Creates a success response
 * @param message - Success message
 * @param data - Data payload
 * @param statusCode - HTTP status code (optional)
 */
export function successResponse<T>(
    message: string,
    data?: T,
    statusCode: number = HttpStatus.OK
): SuccessResponse<T> {
    return commonResponse(true, message, data, statusCode) as SuccessResponse<T>;
}

/**
 * Creates an error response
 * @param message - Error message
 * @param error - Error details
 * @param statusCode - HTTP status code (optional)
 */
export function errorResponse(
    message: string,
    error?: any,
    statusCode: number = HttpStatus.BAD_REQUEST
): ErrorResponse {
    return commonResponse(false, message, error, statusCode) as ErrorResponse;
}

/**
 * Throws an HTTP exception with standardized format
 * @param message - Error message
 * @param statusCode - HTTP status code
 * @param error - Error details (optional)
 */
export function throwError(
    message: string,
    statusCode: number = HttpStatus.BAD_REQUEST,
    error?: any
): never {
    throw new HttpException(
        errorResponse(message, error, statusCode),
        statusCode
    );
}