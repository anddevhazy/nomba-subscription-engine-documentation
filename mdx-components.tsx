import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  code: (props) => {
    const { className, ...rest } = props;
    // Fenced code blocks (```lang) get a `language-*` className from remark;
    // inline `code` spans don't — that's how we tell them apart here.
    const isFenced = typeof className === "string" && className.startsWith("language-");
    return <code className={isFenced ? className : "inline"} {...rest} />;
  },
};

export function useMDXComponents(): MDXComponents {
  return components;
}
