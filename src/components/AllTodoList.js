export default function AllTodoList () {
    const list = [{
        id: 0,
        text: "척추 펴기",
        done: true,
    },
    {
        id: 1,
        text: "물 마시기",
        done: false,
    }]
    return (
        <section>
            <h1>할 일 목록</h1>
            <div>
                <input type="text"/>
                <button>확인</button>
            </div>
            <ul>
                {list.map(item => 
                    <li key={item.id}>{item.text}z</li>)
                }
            </ul>
        </section>
    )
}