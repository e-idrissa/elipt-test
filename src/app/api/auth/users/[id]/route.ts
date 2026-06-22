import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

const VPS_URL = "https://elipt.elieruvinga.online";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  try {
    const { id } = params;

    const response = await axios.delete(`${VPS_URL}/AppUsers/Delete/${id}`, {
      headers: { "Content-Type": "application/json" },
      data: {},
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(
      "Error Delete Proxy:",
      error instanceof AxiosError ? error.response?.data : "",
    );
    const status = error instanceof AxiosError ? error.response?.status : 500;
    const message =
      error instanceof AxiosError
        ? error.response?.data?.message
        : "Failed to delete account.";

    return NextResponse.json({ message }, { status });
  }
}
