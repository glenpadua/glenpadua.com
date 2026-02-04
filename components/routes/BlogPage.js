import styled from 'styled-components';
import Layout from 'components/Layout';
import PageTitle from 'components/PageTitle';
import PostList from 'components/PostList';
import { MainNav } from 'components/Header/styles';
import { NavItem } from 'components/Header/MobileNav';
import { categories } from 'utils/helpers';

const Wrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Categories = styled.div`
  margin-top: 30px;

  @media only screen and (min-width: 600px) {
    margin-top: 50px;
  }
`;

const Nav = styled(MainNav)`
  @media only screen and (max-width: 600px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  li {
    margin-bottom: 10px;
  }
`;

export default function BlogPage({ posts, category }) {
  return (
    <Layout>
      <Wrapper>
        <PageTitle>
          Blog Posts{' '}
          <span role="img" aria-label="book">
            📖
          </span>
        </PageTitle>
        <Categories>
          <Nav>
            {categories.map(item => (
              <NavItem
                key={item.name}
                name={item.name}
                url={item.url}
                isActive={
                  (item.category === '' && !category) || item.category === category
                }
              />
            ))}
          </Nav>
        </Categories>
        <PostList posts={posts} category={category} />
      </Wrapper>
    </Layout>
  );
}
