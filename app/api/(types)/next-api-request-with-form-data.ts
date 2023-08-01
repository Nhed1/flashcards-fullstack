import { NextApiRequest } from "next";
import { NextRequest } from "next/server";

export type NextApiRequestWithFormData = NextApiRequest &
  NextRequest &
  Request & {
    files: any[];
  };
