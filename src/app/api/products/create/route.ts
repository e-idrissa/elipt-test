import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios, { AxiosError } from "axios";

const VPS_URL = "https://elipt.elieruvinga.online";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: Missing token" },
        { status: 401 },
      );
    }

    const body = await request.json();

    const response = await axios.post(`${VPS_URL}/Product/Create`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(
      "Error POST Product Proxy:",
      error instanceof AxiosError ? error.response?.data : "",
    );
    const status = error instanceof AxiosError ? error.response?.status : 500;
    const message =
      error instanceof AxiosError
        ? error.response?.data?.message
        : "Failed to create product.";
    return NextResponse.json({ message }, { status });
  }
}
