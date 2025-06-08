import React from 'react'
import { MdGridView } from "react-icons/md";
import { FaList } from "react-icons/fa";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../components/Tabs";
//import TaskTitle from "../components/TaskTitle";

//import { useSelector } from "react-redux";


const TABS = [
  {title: "Board view", icon: <MdGridView/>},
  {title: "List view", icon: <FaList/>},
];

const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
}

export const Tasks = () => {
  const params = useParams()

  const [selected, setSelected] = useState(0)
  const [open,setOpen]= useState(false)
  const [loading, setLoading] = useState(false);

  const status = params.status || "";

  return loading ? (
    <div className='py-10'>
      <Loading />
    </div>
  ):(<div className='w-full'>
    <div className='flex items-center justify-between mb-4'>
      <Title title={status ? `${status} Tasks` : "Tasks"} />
      {
        !status && <Button
        label= "Create Task"
        icon ={<IoMdAdd className=' text-lg' />}
        className="flex flex-row-reverse items-center gap-1 bg-blue-600 text-white rounded-md py-2 2xl:py-2.5" 
        />
      }
    </div>


    <div>
    <Tabs tabs={TABS} setSelected={setSelected}>
        {!status && (
          <div className='w-full flex justify-between gap-4 md:gap-x-12 py-4'>
            <TaskTitle label='To Do' className={TASK_TYPE.todo} />
            <TaskTitle
              label='In Progress'
              className={TASK_TYPE["in progress"]}
            />
            <TaskTitle label='completed' className={TASK_TYPE.completed} />
          </div>
        )}

        {selected !== 1 ? (
          <BoardView tasks={tasks} />
        ) : (
          <div className='w-full'>
            <Table tasks={tasks} />
          </div>
        )}
      </Tabs>
    </div>
    

  </div>
  
)

}
