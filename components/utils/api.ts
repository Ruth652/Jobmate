import axios from "axios";

interface UploadCVResponse {
  success: boolean;
  message: string;
}

export async function uploadCV(file: File): Promise<UploadCVResponse> {
  const formData = new FormData();
  formData.append("cv", file);

  try {
    const res = await axios.post<UploadCVResponse>("/api/upload-cv", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("CV upload failed:", error.response?.data || error.message);
      throw error.response?.data || error.message;
    } else {
      console.error("Unexpected error:", error);
      throw error;
    }
  }
}
