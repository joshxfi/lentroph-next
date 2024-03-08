import { FragmentOf, graphql, readFragment } from "gql.tada";

export const PostFields = graphql(`
  fragment PostFields on Post {
    content
    author {
      id
      username
    }
  }
`);

export function Post({ post }: { post: FragmentOf<typeof PostFields> }) {
  const data = readFragment(PostFields, post);

  return (
    <div>
      <h2>{data.author.username}</h2>
      <p>{data.content}</p>
    </div>
  );
}
