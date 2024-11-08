import "../app/globals.css"
import { useState } from "react";
import Header from "@/components/Header";
import TaskList from "@/components/TaskList";
import { Plus } from "@phosphor-icons/react";

function Home() {
  return (
    <main className="flex flex-col gap-6 w-11/12 mx-auto max-w-96 my-11">
      <Header pageLabel="Bem vindo de volta Gabriel!" />
      <div className="block h-[1px] bg-gray-3" />

      <TaskList />

      <button className="absolute w-14 h-14 flex justify-center items-center bg-green-2 rounded-full bottom-4 left-1/2 -translate-x-1/2">
        <Plus className="text-white" size={28} />
      </button>
    </main>
  );
}

export default Home;
