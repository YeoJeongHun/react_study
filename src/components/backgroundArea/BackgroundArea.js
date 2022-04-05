
import { useSelector } from 'react-redux';
import './BackgroundArea.css';
import AllTodoList from '../AllTodoList';
import DoneList from '../DoneList';
import ArticleList from '../article/ArticleList';

export default function BackgroundArea () {

    return (
        <section>
            <div id="testId">
                <AllTodoList/>
                <DoneList/>
                <ArticleList/>
            </div>
        </section>
    )
}