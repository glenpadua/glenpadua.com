import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { RichText } from 'prismic-reactjs';
import { format } from 'date-fns';

import { GET_SNIPPETS } from 'utils/queries';
import Snippet from 'components/Snippet';

const Wrapper = styled.ul`
  margin-top: 20px;
  list-style: none;
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Item = styled.li`
  width: 100%;
  margin: 20px 0;
  max-width: 800px;
`;

const SnippetList = () => {
  const { loading, error, data } = useQuery(GET_SNIPPETS);
  if (error) return <div>Error</div>;
  if (loading) return <div>Loading...</div>;
  const { allSnippets } = data;
  return (
    <Wrapper>
      {allSnippets.edges.map(snippet => {
        const title = RichText.asText(snippet.node.title);
        const published = format(new Date(snippet.node.date), 'MMM d, yyyy');
        const body = snippet.node.body;
        const uid = snippet.node._meta.uid;
        return (
          <Item key={snippet.node._meta.id}>
            <Snippet
              uid={uid}
              title={title}
              published={published}
              body={body}
              truncate={200}
            />
          </Item>
        );
      })}
    </Wrapper>
  );
};

export default SnippetList;
