/**
 * JsonLd — renders a JSON-LD structured-data <script> tag.
 * File path: /components/seo/json-ld.tsx
 *
 * Server component. Pass the object built by /lib/schema.ts. The JSON is
 * serialised with </ escaped so user-supplied strings can never break out
 * of the script element.
 */

type Props = {
  data: Record<string, unknown>;
};

export function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
