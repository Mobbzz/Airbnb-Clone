

import express, { Request, Response, NextFunction } from 'express';

declare module 'express' {
  export interface Request {
    user?: {
      id: string;
      email: string;
    };
  }
  
  export type Middleware = (req: Request, res: Response, next: NextFunction) => void;
}


export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Accommodation {
  id: string;
  title: string;
  location: string;
  price: number;
  images: string[];
}
