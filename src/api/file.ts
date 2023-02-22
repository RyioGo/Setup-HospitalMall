import api from "./service";

export const file_storage = (data: FormData) => {
  return api.post("/system/file/storage", data, {
    headers: {
      "Content-Type": "	multipart/form-data",
    },
  });
};
