import { buildConfig } from "payload/config";
import path from "path";
import { Users } from "./collections/Users";
import { Pages } from "./collections/Pages";
import { MainMenu } from "./globals/MainMenu";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { Media } from "./collections/Media";
import { gcsAdapter } from "@payloadcms/plugin-cloud-storage/gcs";

const adapter = gcsAdapter({
  options: {
    credentials: JSON.parse(process.env.GCS_CREDENTIALS || "{}"),
  },
  bucket: String(process.env.GCS_BUCKET),
});

export default buildConfig({
  collections: [Pages, Users, Media],
  globals: [MainMenu],
  typescript: {
    outputFile: path.resolve(__dirname, "../payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [
    cloudStorage({
      collections: {
        media: {
          adapter,
          disablePayloadAccessControl: true,
          prefix: process.env.GCS_PREFIX,
        },
      },
    }),
  ],
});
