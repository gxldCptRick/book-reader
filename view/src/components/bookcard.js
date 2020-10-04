import React from "react";

export default function BookCardComponent(props) {
  console.log("the props", props);
  return (
    <div className="book-container__item">

      <div className="book-container__item__image">
        <img src={props.coverSource} />
      </div>

      <div className="book-container__item__info">
        <p className="book-container__item__info__title">{props.name}</p>
        <div className="book-container__item__info__tag-container">
          {props.tags.map(tag => (<p className="book-container__item__info__tag-container__item">{tag}</p>))}
        </div>
        <p className="book-container__item__info__description">{props.description}</p>
      </div>
      
    </div>
  );
}
