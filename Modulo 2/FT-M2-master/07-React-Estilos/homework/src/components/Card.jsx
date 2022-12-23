import React from 'react';
import s from './Card.module.css';

export default function Card(props) {
  // acá va tu código
  return  (<div className={s.colorFondo}>
    <button className={s.boton} onClick= {props.onClose}>X</button>
    <h4 className={s.colorTitulo}>{props.name}</h4>
    <div className={s.columnas}>
      <div>
        <p className={s.colorMin}>Min</p>
        <p>{props.min}</p>
      </div>
      <div>
        <p className={s.colorMax}>Max</p>
        <p>{props.max}</p>
      </div>
      <div>
        <img src= {`http://openweathermap.org/img/wn/${props.img}@2x.png`}/>
      </div>
    </div> 
</div>)
};