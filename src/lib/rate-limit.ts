// Rate limiter using in-memory store
// For production at scale, replace with Redis-based limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Clean up expired entries every 60 seconds
setInterval(() => {
    const now = Date.now();
    rateLimitMap.forEach((value, key) => {
        if (now > value.resetTime) {
            rateLimitMap.delete(key);
        }
    });
}, 60000);

export function rateLimit(
    identifier: string,
    maxRequests: number = 10,
    windowMs: number = 60000
): { success: boolean; remaining: number } {
    const now = Date.now();
    const record = rateLimitMap.get(identifier);

    if (!record || now > record.resetTime) {
        rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
        return { success: true, remaining: maxRequests - 1 };
    }

    if (record.count >= maxRequests) {
        return { success: false, remaining: 0 };
    }

    record.count++;
    return { success: true, remaining: maxRequests - record.count };
}
