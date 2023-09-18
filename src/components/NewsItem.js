import React from 'react'

const NewsItem=(props)=> {

    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
      <div className=''>
        <div className="card">
          <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%' ,zIndex:'1'}}>
            {source}
          </span>
          <img src={!imageUrl ? "https://i.sozcucdn.com/wp-content/uploads/2023/08/27/elonmusk-shutter.jpeg?w=1200&h=675&mode=crop" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title} </h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary">By {!author ? "unknown" : author}<br /> on {new Date(date).toGMTString()} </small></p>
            <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Readmore</a>
          </div>
        </div>
      </div>
    )
}

export default NewsItem
