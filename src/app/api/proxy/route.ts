import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";

const PATCH = async (req: NextRequest) => {
  const token = await getToken({
    req,
  });

  if (!token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  return Response.json({ accessToken: token.accessToken });
};

export { PATCH };
