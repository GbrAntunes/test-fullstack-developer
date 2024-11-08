import { Check, Trash } from "@phosphor-icons/react"
import { useEffect, useState } from "react"
import { Task } from "../../types/task"
import axios from "axios"

function TaskList() {
  const [selectedFilter, setSelectedFilter] = useState("Todas")
  const [tasks, setTasks] = useState<Task[]>([])
  const [filteredTasks, setFilteredTasks] = useState(tasks)

  useEffect(() => {
    axios.get("http://localhost:3001/tasks?createdByUser=1&_sort=done&_order=asc")
      .then((response) => {
        setTasks(response.data)
        setFilteredTasks(response.data)
      })
      .catch((error) => {
        console.error(error)
      }
    )
  }, [])

  useEffect(() => {
    if (selectedFilter === "Todas") {
      setFilteredTasks(tasks)
    } else if (selectedFilter === "fazer") {
      setFilteredTasks(tasks.filter(task => task.done === false))
    } else {
      setFilteredTasks(tasks.filter(task => task.done === true))
    }
  }, [selectedFilter])

  if (tasks.length === 0) {
    return (
      <p className="opacity-40">Carregando tarefas...</p>
    )
  }

  return (
    <div className="flex flex-col gap-2 flex-1">
      <div className="flex gap-2">
        <div
          className={`flex gap-1 items-center cursor-pointer ${selectedFilter === "Todas" ? "opacity-100" : "opacity-40"}`}
          onClick={() => setSelectedFilter("Todas")}
        >
          <div className="text-brown-1">
            Todas
          </div>
          <span className="flex justify-center items-center rounded-sm w-3 h-3 bg-brown-1 text-white text-2xs mt-1">
            {tasks.length}
          </span>
        </div>

        <span className="opacity-30">|</span>

        <div
          className={`flex gap-1 items-center cursor-pointer ${selectedFilter === "fazer" ? "opacity-100" : "opacity-40"}`}
          onClick={() => setSelectedFilter("fazer")}
        >
          <div className="text-brown-1">
            a fazer
          </div>
          <span className="flex justify-center items-center rounded-sm w-3 h-3 bg-brown-1 text-white text-2xs mt-1">
            {tasks.filter(task => task.done === false).length}
          </span>
        </div>

        <div
          className={`flex gap-1 items-center cursor-pointer ${selectedFilter === "finalizadas" ? "opacity-100" : "opacity-40"}`}
          onClick={() => setSelectedFilter("finalizadas")}
        >
          <div className="text-brown-1">
            finalizadas
          </div>
          <span className="flex justify-center items-center rounded-sm w-3 h-3 bg-brown-1 text-white text-2xs mt-1">
            {tasks.filter(task => task.done === true).length}
          </span>
        </div>
      </div>

      <ul className="flex flex-col gap-2">
        {filteredTasks.map(task => (
          <li key={task.id} className="flex justify-between items-center gap-3 rounded-sm bordere border-gray-2 bg-white px-2 py-3 text-gray-5">
            <button
              className="block relative w-4 h-4 border border-gray-3 rounded-sm cursor-pointer"
            >
              {task.done && (
                <Check className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              )}
            </button>

            <p className={`flex-1 ${task.done && "line-through"}`}>{task.title}</p>

            <button>
              <Trash size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskList
