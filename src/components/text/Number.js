
import React, { useEffect, useRef, useState } from 'react';
import './Number.css';
import { Progress } from 'antd';
const axios = require('axios');

// 참고 주소
// https://sukjae.github.io/daily-study/daily/2019-08-01/

export default function Number () {
    const canvas = useRef(null);
    const canvas_resize = useRef(null);
    
    const [answer, setAnswer] = useState(undefined);
    const [percent, setPercent] = useState([0,0,0,0,0,0,0,0,0,0]);
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

            ctx_resize.fillStyle = 'black';
            ctx_resize.beginPath();
            ctx_resize.arc((e.clientX - rect.left)/10, (e.clientY - rect.top)/10, 2, 1, 7);
            ctx_resize.fill();

            ctx_resize.fillRect((e.clientX - rect.left)/10, (e.clientY - rect.top)/10, 1, 1);
            // saveImg();
        }
    };

    const handleReset = () => {
    	ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    	ctx_resize.clearRect(0, 0, canvas_resize.current.width, canvas.current.height);
        setAnswer(null);
    }
    const saveImg = () => {
    	const canvas_img = document.getElementById("resize_img");
        let resize_data = canvas_img.getContext('2d');
        let resize_data_img = resize_data.getImageData(0,0,canvas_img.width, canvas_img.height);
        let img_arr = resize_data_img.data;
        
        let arr = []
        for(let i = 0; i< img_arr.length; i++) {
            if(i % 4 === 3) {
                arr.push(img_arr[i]);
            }
        }

        const req_data = {'arr' : arr};
        const api = axios.create({
            timeout: 10000,
            baseUrl: 'http://localhost:5000',
        })
        api.post('/api/number', req_data)
        .then(function (response) {
            const result_percent = [];
            for(let i = 0; i < response.data.result.length; i++) {
                result_percent.push(parseInt(response.data.result[i]*100));
            }
            setAnswer(response.data.answer);
            setPercent(result_percent);
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    const Demo = () => (
        <div id = 'answer_pallet' style={{ width: 170 }}>
            <div id = 'answer_pallet_component'><span style={{ marginRight: 10 }}>0</span><Progress percent={percent[0]} size="small" /></div>
            <div id = 'answer_pallet_component'><span style={{ marginRight: 10 }}>1</span><Progress percent={percent[1]} size="small" /></div>
            <div id = 'answer_pallet_component'><span style={{ marginRight: 10 }}>2</span><Progress percent={percent[2]} size="small" /></div>
            <div id = 'answer_pallet_component'><span style={{ marginRight: 10 }}>3</span><Progress percent={percent[3]} size="small" /></div>
            <div id = 'answer_pallet_component'><span style={{ marginRight: 10 }}>4</span><Progress percent={percent[4]} size="small" /></div>
            <div id = 'answer_pallet_component'><span style={{ marginRight: 10 }}>5</span><Progress percent={percent[5]} size="small" /></div>
            <div id = 'answer_pallet_component'><span style={{ marginRight: 10 }}>6</span><Progress percent={percent[6]} size="small" /></div>
            <div id = 'answer_pallet_component'><span style={{ marginRight: 10 }}>7</span><Progress percent={percent[7]} size="small" /></div>
            <div id = 'answer_pallet_component'><span style={{ marginRight: 10 }}>8</span><Progress percent={percent[8]} size="small" /></div>
            <div id = 'answer_pallet_component'><span style={{ marginRight: 10 }}>9</span><Progress percent={percent[9]} size="small" /></div>
            <div id = 'answer_pallet_component'>결과 : {answer}</div>
        </div>
    );

    return (
        <section>
            <div>
                --------------------------------------------------------------------------------------------------------------------------------------
            </div>
            <div className='main'>
                <div className='pallet'>
                    <canvas
                        id='canvas'
                        ref={canvas}
                        width={280}
                        height={280}
                        onMouseMove={handleMouseMove}
                        onMouseDown={e => {
                            setIstMouseDown(true);
                        }}
                        onMouseUp={e => {
                            setIstMouseDown(false);
                        }}
                    />
                </div>
                <div className='result_pallet'>
                    <canvas 
                        id='resize_img'
                        ref={canvas_resize}
                        width={28}
                        height={28}
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
                <button onClick={saveImg}>검증</button>
            </div>
        </section>
    );
}