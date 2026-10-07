import helmet from 'helmet'

export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      frameAncestors: ["'none'"],
      objectSrc: ["'none'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
      imgSrc: ["'self'", 'data:'],
      connectSrc: ["'self'"]
    }
  },

  referrerPolicy: {
    policy: 'no-referrer'
  },

  frameguard: {
    action: 'deny'
  },

  noSniff: true,

  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },

  crossOriginOpenerPolicy: {
    policy: 'same-origin'
  },

  crossOriginResourcePolicy: {
    policy: 'same-origin'
  }
})