
import React, { useEffect, useRef, useState } from 'react';
import './CreateImg.css';
import { Progress } from 'antd';

const axios = require('axios');

export default function CreateImg () {   
    const [imgList, setImgList] = useState([]);
    const [last5imgList, setLast5imgList] = useState([]);
    const [imgUrl, setImgUrl] = useState("http://localhost:4000/img/001");

    const keyDownFunction = (e) => {
        if(e.key === '1') {
            setImgUrl("http://localhost:4000/img/001");
            setImgList([
                ...imgList,
                {
                    id: e.key,
                    url: 'http://localhost:4000/img/001',
                    text: 'hihi',
                }
            ]);
        }
        else if(e.key === '2') {
            setImgUrl("http://localhost:4000/img/002");
            setImgList([
                ...imgList,
                {
                    id: e.key,
                    url: 'http://localhost:4000/img/002',
                    text: 'hihi',
                }
            ]);
        }
        else if(e.key === '3') {
            setImgUrl("http://localhost:4000/img/003");
            setImgList([
                ...imgList,
                {
                    id: e.key,
                    url: 'http://localhost:4000/img/003',
                    text: 'hihi',
                }
            ]);
        }
    }

    const keyUpFunction = () => {
        const tempImgList = imgList.slice().reverse();
        setLast5imgList(tempImgList.filter( (value, idx) => {
            if (idx < 5)
                return value;
        }));
    }

    const makeImgList = () => {
        const return_arr = [];
        for (let i = 0; i < 3; i++) {
            return_arr.push(
                <div>
                    <img src={last5imgList[i].url} /> 결과 : {last5imgList[i].id}
                </div>
            )
        }
        return return_arr;
    }

    return (
        <section>
            <div>
                --------------------------------------------------------------------------------------------------------------------------------------
            </div>
            <div className='main'>
                <input type="text" id='text_area' onKeyDown={keyDownFunction} onKeyUp={keyUpFunction} maxLength={1} />
                <img src={imgUrl} />
            </div>
            <div>
                --------------------------------------------------------------------------------------------------------------------------------------
            </div>
            <div>
                <button>리셋</button>
            </div>
            <div>
                {last5imgList.map( (imgData, idx) => (
                    <div> <img src={imgData.url} /> 결과 : {imgData.text}</div>
                ))}
            </div>
        </section>
    );
}