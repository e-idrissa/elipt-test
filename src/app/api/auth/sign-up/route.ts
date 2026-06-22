import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

const VPS_URL = "https://elipt.elieruvinga.online";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();

    const response = await axios.post(`${VPS_URL}/AppUsers/SignUp`, body, {
      headers: { "Content-Type": "application/json" },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(
      "Error Signup Proxy:",
      error instanceof AxiosError ? error.response?.data : " ",
    );
    const status = error instanceof AxiosError ? error.response?.status : 500;
    const message =
      error instanceof AxiosError
        ? error.response?.data?.message
        : "Failed to sign you up.";

    return NextResponse.json({ message }, { status });
  }
}
