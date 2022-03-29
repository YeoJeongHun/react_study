
import { useSelector } from 'react-redux';
import './BackgroundArea.css';
import AllTodoList from '../AllTodoList';
import DoneList from '../DoneList';

export default function BackgroundArea () {

    return (
        <section>
            <div id="testId">
                <AllTodoList/>
                <DoneList/>
            </div>
        </section>
    )
}