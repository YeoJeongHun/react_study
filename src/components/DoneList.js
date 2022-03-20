export default function DoneList () {
    const list = [];
    return (
        <section>
            {list.length > 0 && <h1>완료된 목록</h1>}
            <ul>
                {list.map(item => {
                    <li key={item.id}>{item.text}</li>
                })}
            </ul>
        </section>
    )
}