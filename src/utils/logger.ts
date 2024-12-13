/**
 * Logs a message with a specific format.
 * @param message The message to log.
 */
export function logMessage(message: string): void {
    console.log(`[LLM Package] ${message}`);
}

/**
 * Logs request and response details along with the latency.
 * 
 * @param startTime The start time of the request in milliseconds.
 * @param endTime The end time of the request in milliseconds.
 * @param method The HTTP method used (e.g., GET, POST).
 * @param endpoint The API endpoint that was called.
 * @param requestBody The request payload.
 * @param responseBody The response payload received from the API.
 */
export function logRequestResponseTime(startTime: number, endTime: number, method: string, endpoint: string, requestBody: any, responseBody: any): void {
    // Format request start time
    const requestTime = new Date(startTime).toISOString();

    // Format response time
    const responseTime = new Date(endTime).toISOString();

    // Calculate latency in milliseconds
    const latency = endTime - startTime;

    // Log request details
    console.log(`[LLM Package] Request started at: ${requestTime}`);
    console.log(`[LLM Package] Request method: ${method}`);
    console.log(`[LLM Package] Request endpoint: ${endpoint}`);
    console.log(`[LLM Package] Request body: ${JSON.stringify(requestBody, null, 2)}`);

    // Log response details
    console.log(`[LLM Package] Response received at: ${responseTime}`);
    console.log(`[LLM Package] Response body: ${JSON.stringify(responseBody, null, 2)}`);

    // Log the calculated latency
    console.log(`[LLM Package] Latency: ${latency} ms`);
}
