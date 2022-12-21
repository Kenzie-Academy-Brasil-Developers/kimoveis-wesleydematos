declare global {
  namespace Express {
    interface Request {
      requesterId: string;
      foundUser: object;
    }
  }
}

export {};
