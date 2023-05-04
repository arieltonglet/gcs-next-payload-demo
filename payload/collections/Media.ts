import { CollectionConfig } from "payload/types";
import path from "path";

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    staticDir: path.resolve(__dirname, "../../media"),
    imageSizes: [
      {
        name: "thumbnail",
        width: 200,
        height: 200,
        crop: "centre",
      },
    ],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};
