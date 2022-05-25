
import React, { useEffect, useRef, useState } from 'react';
import './CreateImg.css';
import { Progress } from 'antd';

const axios = require('axios');

export default function CreateImg () {   
    const [speakerType, setSpeakerType] = useState("item");
    const [imgList, setImgList] = useState([]);
    const [last5imgList, setLast5imgList] = useState([]);
    const [imgUrl, setImgUrl] = useState("http://localhost:4000/img/001");

    const keyDownFunction = (e) => {
        console.log(e.code);
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

    const backButton = () => {
        setImgList(imgList.filter( (value, idx) => {if (idx != imgList.length-1) return value;}));
        const tempImgList = imgList.slice().reverse();
        setLast5imgList(tempImgList.filter( (value, idx) => {
            if (idx < 6 && idx > 0)
                return value;
        }));
    }

    const typeCheck = (e) => {
        console.log(e);
    }

    return (
        <section>
            <div>
                --------------------------------------------------------------------------------------------------------------------------------------
            </div>
            <div>
                <input type="checkbox" name={"item"} value={"item"} onChange={typeCheck()}/> item
            </div>
            <div className='main'>
                <input type="text" id='text_area' onKeyDown={keyDownFunction} onKeyUp={keyUpFunction} maxLength={1} />
                <img src={imgUrl} />
            </div>
            <div>
                --------------------------------------------------------------------------------------------------------------------------------------
            </div>
            <div>
                <button onClick={backButton}>되돌리기</button>
            </div>
            <div>
                {last5imgList.map( (imgData, idx) => (
                    <div> <img src={imgData.url} /> 결과 : {imgData.text}</div>
                ))}
            </div>
        </section>
    );
}