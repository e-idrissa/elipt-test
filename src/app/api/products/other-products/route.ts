import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios, { AxiosError } from "axios";

const VPS_URL = "https://elipt.elieruvinga.online";

export async function GET(): Promise<NextResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: Missing token" },
        { status: 401 },
      );
    }

    const response = await axios.get(`${VPS_URL}/Product/getOtherProduct`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(
      "Error GET Products Proxy:",
      error instanceof AxiosError ? error.response?.data : "",
    );
    const status = error instanceof AxiosError ? error.response?.status : 500;
    const message =
      error instanceof AxiosError
        ? error.response?.data?.message
        : "Failed to fetch products.";
    return NextResponse.json({ message }, { status });
  }
}
