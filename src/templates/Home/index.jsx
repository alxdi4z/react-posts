import './styles.css'
import { Component } from 'react'
import { loadPosts } from '../..//utils/load-posts';
import { Posts } from '../../components/Posts'
import { Button } from '../../components/Button'
import { TextInput } from '../../components/TextInput'


export class Home extends Component {

  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchValue: ''
  }

  async componentDidMount() {
    await this.loadPosts()
  }

  loadPosts = async () => {
    const postsAndPhotos = await loadPosts()
    const { page, postsPerPage } = this.state
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    })
  }

  loadMorePosts = () => {
    const {
      posts,
      postsPerPage,
      page,
      allPosts
    } = this.state

    const nextPage = page + postsPerPage
    const nextsPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextsPosts)
    this.setState({ posts, page: nextPage })
  }

  handleChange = (e) => {
    const { value } = e.target
    this.setState({ searchValue: value })
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state
    const noMorePosts = page + postsPerPage >= allPosts.length

    const filteredPosts = !!searchValue ?
      allPosts.filter(
        post => post.title.toLowerCase().includes(searchValue.toLowerCase())
      )
      :
      posts

    return (
      <section className="container">

        {/* avaliacao de curto circuito
            o !! transforma a variavel a frente em boolean e verifica se eh true, 
            se for true executa o que esta a frente do && 
         */}
        {!!searchValue && console.log(`SerchValue: ${searchValue}`)}
        <div className='search-container'>
          <TextInput searchValue={searchValue} handleChange={this.handleChange} placeHolder='Search...' />
        </div>

        {filteredPosts.length > 0 ?
          <Posts posts={filteredPosts} />
          : <h2>Não existem mais posts :(</h2>
        }

        <div className="button-container">
          {/* avalicacao de curto circuito
              o ! transforma a variavel a frente em boolean e verifica se eh false,
              se for false executa o que esta a frente do &&
           */}
          {!searchValue && (
            <Button
              text="Load more"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>

      </section>
    )
  }
}
