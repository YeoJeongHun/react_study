import AllTodoList from './AllTodoList';
import DoneList from './DoneList';
import BackgroundArea from './backgroundArea/BackgroundArea';
import Number from './text/Number'
import Hangul from './text/Hangul'
import { openArticle, openNumber, openHangul } from '../store/modules/mainStatus';
import { useDispatch, useSelector } from 'react-redux';



function showPage (input_page) {
    switch(input_page) {
        case 'article':
            return <BackgroundArea/>;
        case 'number':
            return <Number/>;
        case 'hangul':
            return <Hangul/>;
    }
}

export default function MainContainer() {
    const nowPage = useSelector((state) => state.mainStatus.page);
    const dispatch = useDispatch();
    const openNumberPage = () => {
        return dispatch(openNumber());
    }
    const openArticlePage = () => {
        return dispatch(openArticle());
    }
    const openHangulPage = () => {
        return dispatch(openHangul());
    }

    const goToArticlePage = () => {
        openArticlePage();
    }
    const goToNumberPage = () => {
        openNumberPage();
    }
    const goToHangulPage = () => {
        openHangulPage();
    }

    return (
        <div>
            <div>
                <button type="button" onClick={goToArticlePage}>게시판</button>
                <button type="button" onClick={goToNumberPage}>숫자 인식</button>
                <button type="button" onClick={goToHangulPage}>한글 인식</button>
            </div>
            <div>
                {showPage(nowPage)}
            </div>
        </div>
    )
}