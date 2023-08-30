import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

constructor(){
  super();
  this.state={
    articles:[],
    loading:false,
    page:1
  }
}
  async componentDidMount(){
    let url="https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=30d7cd5ac32b44b985ba64030d07e05c"
    let data= await fetch(url);
    let parsedData=await data.json()
    this.setState({articles: parsedData.articles})
  }
  handlePreClick=async()=>{
    console.log('This is prev')
    let url=`https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=30d7cd5ac32b44b985ba64030d07e05c&page=${this.state.page-1}`;
    let data= await fetch(url);
    let parsedData=await data.json()
    

    this.setState({
      page:this.state.page-1,
      articles: parsedData.articles
    })
  }
  handleNextClick=async()=>{
    console.log('This is next');

    let url=`https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=30d7cd5ac32b44b985ba64030d07e05c&page=${this.state.page+1}`;
    let data= await fetch(url);
    let parsedData=await data.json()
    

    this.setState({
      page:this.state.page+1,
      articles: parsedData.articles
    })
  }

  render() {
    return (

      <div className='container my-3'>
        <h1>Nepal Time - A news Portal</h1>
        <div className="row">
        {this.state.articles.map((element)=>{
        return <div className="col-md-4" key={element.url}>
          <NewsItem title={element.title?element.title.slice(0,50): " "} description={element.description?element.description.slice(0,88): ""} imageUrl={element.urlToImage} newsUrl={element.url}/>
          </div>
        })}
          
        </div>
        <div className="container d-flex justify-content-between my-3">
        <button disabled={this.state.page<=1} type="button" className="btn btn-outline-dark" onClick={this.handlePreClick}>&larr; Previous</button>
        <button type="button" className="btn btn-outline-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
