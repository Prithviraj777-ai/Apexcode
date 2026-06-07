const rateLimitMap = new Map();

const rateLimiter = (limit, windowMs) => {
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    
    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
      return next();
    }
    
    const record = rateLimitMap.get(ip);
    
    if (now > record.resetTime) {
      record.count = 1;
      record.resetTime = now + windowMs;
      return next();
    }
    
    if (record.count >= limit) {
      return res.status(429).json({ message: "Too many requests. Please try again later." });
    }
    
    record.count += 1;
    next();
  };
};

module.exports = rateLimiter;
