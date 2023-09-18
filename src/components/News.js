
import React, {useEffect, useLayoutEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import { useAsyncError } from 'react-router-dom';


const News=(props)=> {
  const [articles,setArticles]=useState([])
  const [loading,setLoading]=useState([true])
  const [page,setPage]=useState(1)
  const [totalResults,setTotalResults]=useState(0)
  // document.title = `${capitalizedFirstLetter(props.category)} - NepalNews`;
  const capitalizedFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
const updateNews = async()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);
    setArticles(parsedData.articles)
    setLoading(false)
    setTotalResults(parsedData.totalResults)
    props.setProgress(100);
  }
  useEffect(()=>{
     updateNews();
  },[])

  const handlePreClick = async () => {
    // console.log('This is prev')
    // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=30d7cd5ac32b44b985ba64030d07e05c&page=${this.state.page-1}&pageSize=${props.pageSize}`;
    // this.setState({ loading: true });
    // let data= await fetch(url);
    // let parsedData=await data.json()


    // this.setState({
    //   page:this.state.page-1,
    //   articles: parsedData.articles,
    //   loading: false
    // })
    setPage(page-1)
    updateNews();
  }
  const handleNextClick = async () => {
    //   console.log('This is next');
    //   if(!(this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize))){
    //   let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=30d7cd5ac32b44b985ba64030d07e05c&page=${this.state.page+1}&pageSize=${props.pageSize}`;
    //   this.setState({ loading: true });
    //   let data= await fetch(url);
    //   let parsedData=await data.json()

    //   this.setState({
    //     page:this.state.page+1,
    //     articles: parsedData.articles,
    //     loading: false
    //   })
    // }
    setPage(page+1)
    updateNews();
  }

  const fetchMoreData = async () => {
    setPage(page+1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles(articles.concat (parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };
  

  // 
    return (
      <>
        <h1 className="text-center" style={{ margin: '35px 0px' }}>
          Nepal Time - A {capitalizedFirstLetter(props.category)} News Portal
        </h1>
      
          {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader= {<Spinner/>}
        >
          <div className="container">
        <div className="container">
        <div className="row">


          {articles.map((element) => {
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
News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}
export default News
