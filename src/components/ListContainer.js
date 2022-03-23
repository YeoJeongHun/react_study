import AllTodoList from './AllTodoList';
import DoneList from './DoneList';
import BackgroundImg from './backgroundImg/BackgroundImg';

export default function ListContainer() {
    return (
        <div>
            <AllTodoList />
            <DoneList />
            <BackgroundImg />
        </div>
    )
}