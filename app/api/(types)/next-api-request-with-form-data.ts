import { NextApiRequest } from "next";

export type NextApiRequestWithFormData = NextApiRequest &
  Request & {
    files: any[];
  };
