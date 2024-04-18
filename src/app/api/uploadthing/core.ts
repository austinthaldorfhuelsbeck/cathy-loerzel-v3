import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      return {
        url: file.url,
        metadata: metadata,
      };
    },
  ),
  audioUploader: f({ audio: { maxFileSize: "64MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      return {
        url: file.url,
        metadata: metadata,
      };
    },
  ),
  videoUploader: f({ video: { maxFileSize: "512MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      return {
        url: file.url,
        metadata: metadata,
      };
    },
  ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
