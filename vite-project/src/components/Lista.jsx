import { useCallback, useReducer, useEffect, useState, startTransition } from "react";

const tarefasReducer = (state, action) => {
    switch (action.type) {
        case 'add_tarefa':
            return [...state, action.payload]

        case 'concluir_tarefa':
            const atualizarTarefa = [...state]
            atualizarTarefa[action.payload].completed = true
            return atualizarTarefa
    }
}

export default function Lista() {

    const [tarefa, setTarefa] = useState('')

    const [tarefaAtual, dispatch] = useReducer(tarefasReducer, [])

    const addTarefa = useCallback(() => {
        if (tarefa.trim() !== '') {
            dispatch({ type: 'add_tarefa', payload: { text: (tarefa), completed: false } })
        }
    }, [tarefa])

    const concluirTarefa = useCallback((index) =>{
        dispatch({type:'concluir_tarefa', payload:index})
    })

    return (

        <div className="center">

            <h1>Lista de Tarefas</h1>

            <div className="inputA">

                <input
                    type="text"
                    placeholder="Nova Tarefa"
                    value={tarefa}
                    onChange={(e) => setTarefa(e.target. value)}
                />
                <button onClick={addTarefa}>Add Tarefa</button>

            </div>
            <ul>
                {tarefaAtual.map((tarefas, index) => (
                    <li kay={index}>
                        <span style={{textDecoration: tarefas.completed ? 'line-through' : 'none'}}>
                        {tarefas.text}
                        </span>
                        {!tarefas.Completed &&(
                            <>
                            <button onClick={() => concluirTarefa(index)}>Concluir</button>
                            </>

                        )}
                    </li>

                ))}


            </ul>
        </div>
    )

}