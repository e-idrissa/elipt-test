import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios, { AxiosError } from "axios";

const VPS_URL = "https://elipt.elieruvinga.online";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const { id } = await params;

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: Missing token" },
        { status: 401 },
      );
    }

    const response = await axios.delete(`${VPS_URL}/Product/delete/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {},
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(
      "Error DELETE Product Proxy:",
      error instanceof AxiosError ? error.response?.data : "",
    );
    const status = error instanceof AxiosError ? error.response?.status : 500;
    const message =
      error instanceof AxiosError
        ? error.response?.data?.message
        : "Failed to delete product.";
    return NextResponse.json({ message }, { status });
  }
}
