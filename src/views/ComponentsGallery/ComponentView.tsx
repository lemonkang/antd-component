import ReactMarkdown from "react-markdown";
import { Divider } from "antd";
import { createElement, lazy, Suspense, useMemo } from "react";
import "github-markdown-css/github-markdown-light.css";
import "./markdwon-theme-added.scss";
import SpinIcon from "@components/SpinIcon/SpinIcon";

export type ComponentViewData = {
  module: () => Promise<any>;
  readme: string;
  path: string;
};

export function ComponentView({ readme, path, module }: ComponentViewData) {
  const baseUrl = useMemo(() => {
    return new URL(path, window.location.origin).href;
  }, [path]);
  return (
    <div>
      <article className={"markdown-body markdown-theme-added"}>
        <ReactMarkdown
          transformImageUri={(url) => {
            return new URL(url, baseUrl + "/").href;
          }}
        >
          {readme}
        </ReactMarkdown>
      </article>
      <Divider>Demo</Divider>
      <div>
        <Suspense
          fallback={
            <div className={"flex justify-center p-10"}>
              <SpinIcon />
            </div>
          }
        >
          {createElement(lazy(module))}
        </Suspense>
      </div>
    </div>
  );
}
