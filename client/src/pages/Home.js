import { Grid } from 'semantic-ui-react'
import { useQuery, gql } from "@apollo/client";
import PostCard from '../components/PostCard'

const FETCH_POST_QUERY = gql`
  query GetPosts {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes{
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

const Home = () => {

  const { loading, error, data } = useQuery(FETCH_POST_QUERY)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
      <>
        <Grid columns='three' divided>
          <Grid.Row>
            Recent Posts
          </Grid.Row>
          <Grid.Row>
            {
              data?.getPosts?.map((post)=> (
                <Grid.Column key={post.id}>
                  <PostCard post={post} />
                </Grid.Column>
                )
              )
            }
          </Grid.Row>
        </Grid>
      </>
  )
}



export default Home;