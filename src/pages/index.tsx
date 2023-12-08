import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import config from "../../config";

const isBrowser = typeof window !== "undefined";

export const Head: HeadFC = () => <title>{config.appName}</title>;

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      <a href={config.singlePlayerLink}> single player</a>
    </main>
  );
};

export default IndexPage;
