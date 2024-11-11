import requestController from "@/services/request_controller";

export function CopyTo(data: { sourcePath: string; destinationPath: string }) {
  return requestController.post("/CopyTo", {
    data,
  });
}
