
import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {
static defaultProps={
  country: 'in',
  pageSize: 8,
  category:'general'
}
static propTypes={
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

constructor(){
  super();
  this.state={
    articles:[],
    loading:false,
    page:1
  }
}
  async componentDidMount(){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=30d7cd5ac32b44b985ba64030d07e05c&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data= await fetch(url);
    let parsedData=await data.json()
    this.setState({articles: parsedData.articles, 
      totalResults:parsedData.totalResults, 
      loading: false})
  }
  handlePreClick=async()=>{
    console.log('This is prev')
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=30d7cd5ac32b44b985ba64030d07e05c&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data= await fetch(url);
    let parsedData=await data.json()
    

    this.setState({
      page:this.state.page-1,
      articles: parsedData.articles,
      loading: false
    })
  }
  handleNextClick=async()=>{
    console.log('This is next');
    if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=30d7cd5ac32b44b985ba64030d07e05c&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data= await fetch(url);
    let parsedData=await data.json()
    
    this.setState({
      page:this.state.page+1,
      articles: parsedData.articles,
      loading: false
    })
  }
  }

  render() {
    return (

      <div className='container my-3'>
        <h1 className="text-center" style={{margin: '35px 0px'}}>
        Nepal Time - A news Portal</h1>
        { this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element) =>{
        return <div className="col-md-4" key={element.url}>
          <NewsItem title={element.title?element.title.slice(0,50): " "} description={element.description?element.description.slice(0,88): ""} imageUrl={element.urlToImage} newsUrl={element.url}/>
          </div>
        })}
          
        </div>
        <div className="container d-flex justify-content-between my-3">
        <button disabled={this.state.page<=1} type="button" className="btn btn-outline-dark" onClick={this.handlePreClick}>&larr; Previous</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-outline-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
