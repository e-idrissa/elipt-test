import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

const VPS_URL = "https://elipt.elieruvinga.online";

interface UploadResponseSuccess {
  Url: string;
  secureUrl: string;
}

interface ApiErrorResponse {
  message: string;
}

export async function POST(
  request: Request,
): Promise<NextResponse<UploadResponseSuccess | ApiErrorResponse>> {
  try {
    const formData = await request.formData();

    const response = await axios.post(
      `${VPS_URL}/AppUsers/UploadImage`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(
      "Erreur Upload Proxy:",
      error instanceof AxiosError ? error.response?.data : "",
    );
    const status = error instanceof AxiosError ? error.response?.status : 500;
    const message =
      error instanceof AxiosError
        ? error.response?.data?.message
        : "Failed to upload the image.";
    return NextResponse.json({ message }, { status });
  }
}
