
import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  capitalizedFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    }
    document.title = `${this.capitalizedFirstLetter(this.props.category)} - NepalNews`;
  }
  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=30d7cd5ac32b44b985ba64030d07e05c&page=${this.state.page}}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    })
  }
  async componentDidMount() {
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=30d7cd5ac32b44b985ba64030d07e05c&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data= await fetch(url);
    // let parsedData=await data.json()
    // this.setState({articles: parsedData.articles, 
    //   totalResults:parsedData.totalResults, 
    //   loading: false})
    this.updateNews();
  }
  handlePreClick = async () => {
    // console.log('This is prev')
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=30d7cd5ac32b44b985ba64030d07e05c&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data= await fetch(url);
    // let parsedData=await data.json()


    // this.setState({
    //   page:this.state.page-1,
    //   articles: parsedData.articles,
    //   loading: false
    // })
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  }
  handleNextClick = async () => {
    //   console.log('This is next');
    //   if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=30d7cd5ac32b44b985ba64030d07e05c&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    //   this.setState({ loading: true });
    //   let data= await fetch(url);
    //   let parsedData=await data.json()

    //   this.setState({
    //     page:this.state.page+1,
    //     articles: parsedData.articles,
    //     loading: false
    //   })
    // }
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=30d7cd5ac32b44b985ba64030d07e05c&page=${this.state.page}}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
      articles:  this.state.articles.concat (parsedData.articles),
      totalResults: parsedData.totalResults
    })
  };
  

  // 
  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: '35px 0px' }}>
          Nepal Time - A {this.capitalizedFirstLetter(this.props.category)} News Portal
        </h1>
      
          {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader= {<Spinner/>}
        >
          <div className="container">
        <div className="container">
        <div className="row">


          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 50) : " "}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        </div>
        </div>
        </InfiniteScroll>
      </>
    );
  }

}

export default News
