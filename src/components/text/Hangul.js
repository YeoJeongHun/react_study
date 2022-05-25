
import React, { useEffect, useRef, useState } from 'react';
import './Hangul.css';
import { Progress } from 'antd';
const axios = require('axios');

export default function Hangul () {
    const canvas = useRef(null);
    const canvas_resize = useRef(null);
    
    const [text, setText] = useState(undefined);
    const [answer, setAnswer] = useState(undefined);
    const [ctx, setCts] = useState(undefined);
    const [ctx_resize, setCts_resize] = useState(undefined);
    const [isMouseDown, setIstMouseDown] = useState(false);

    useEffect(()=> {
        setCts(canvas.current.getContext('2d'));
        setCts_resize(canvas_resize.current.getContext('2d'));
    });

    const handleMouseMove = e => {
        if (ctx && isMouseDown) {
            var rect = canvas.current.getBoundingClientRect();
            ctx.fillStyle = 'black';

            ctx.beginPath();
            ctx.arc(e.clientX - rect.left, e.clientY - rect.top, 15, 0, 7);
            ctx.fill();
            // ctx_resize.fillRect((e.clientX - rect.left)/10, (e.clientY - rect.top)/10, 0, 7);
            ctx_resize.beginPath();
            ctx_resize.arc((e.clientX - rect.left)/10, (e.clientY - rect.top)/10, 1, 0, 7);
            ctx_resize.fill();
        }
    };

    const handleReset = () => {
    	ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    	ctx_resize.clearRect(0, 0, canvas_resize.current.width, canvas.current.height);
        setAnswer(null);
    }
    const saveImg = () => {
    	// const canvas_img = document.getElementById("resize_img");
    	const canvas_img = document.getElementById("canvas");
        let resize_data = canvas_img.getContext('2d');
        let resize_data_img = resize_data.getImageData(0,0,canvas_img.width, canvas_img.height);
        let img_arr = resize_data_img.data;
        
        let arr = []
        for(let i = 0; i< img_arr.length; i++) {
            if(i % 4 === 3) {
                arr.push(255-img_arr[i]);
            }
        }

        // console.log(img_arr);
        // console.log(img_arr.length);
        // console.log(arr.length);

        const req_data = {'arr' : arr};
        const api = axios.create({
            timeout: 100000,
            baseUrl: 'http://localhost:5000',
        })
        api.post('/api/hangul95', req_data)
        .then(function (response) {
            setAnswer(response.data.result);
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    const text2img = () => {
    	ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    	ctx_resize.clearRect(0, 0, canvas_resize.current.width, canvas.current.height);
        ctx.font = '256px Gulim';
        ctx.fillText(text, 30, 230);
        ctx_resize.font = '25px serif';
        ctx_resize.fillText(text, 3, 24);
    }

    const Demo = () => (
        <div id = 'answer_pallet' style={{ width: 170 }}>
            <div id = 'answer_pallet_component'>결과 : {answer}</div>
        </div>
    );

    return (
        <section>
            <div>
                --------------------------------------------------------------------------------------------------------------------------------------
            </div>
            <div className='main'>
                <input type="text" id='text_area' onChange={(e) => setText(e.target.value)} maxLength={1} />
                <div className='pallet'>
                    <canvas
                        id='canvas'
                        ref={canvas}
                        width={320}
                        height={320}
                        onMouseMove={handleMouseMove}
                        onMouseDown={e => {
                            setIstMouseDown(true);
                        }}
                        onMouseUp={e => {
                            setIstMouseDown(false);
                            saveImg();
                        }}
                    />
                </div>
                <div className='result_pallet'>
                    <canvas 
                        id='resize_img'
                        ref={canvas_resize}
                        width={32}
                        height={32}
                    />
                </div>
                <div >
                    <Demo/>
                </div>
            </div>
            <div>
                --------------------------------------------------------------------------------------------------------------------------------------
            </div>
            <div>
                <button onClick={handleReset}>리셋</button>
                <button onClick={text2img}>그리기</button>
                <button onClick={saveImg}>검증</button>
            </div>
        </section>
    );
}