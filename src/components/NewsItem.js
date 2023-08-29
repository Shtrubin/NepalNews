import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title,description,imageUrl,newsUrl} = this.props;
    return (
      <div className=''>
      <div className="card" style={{width: "18rem"}}>
          <img src={!imageUrl?"https://i.sozcucdn.com/wp-content/uploads/2023/08/27/elonmusk-shutter.jpeg?w=1200&h=675&mode=crop":imageUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a href={newsUrl} target='_blank' className="btn btn-sm btn-primary">Readmore</a>
          </div>
      </div>
      </div>
    )
  }
}

export default NewsItem
