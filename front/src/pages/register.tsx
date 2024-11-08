import "../app/globals.css"
import Input from "@/components/Input";
import { useState } from "react";
import Header from "@/components/Header";
import Link from "next/link";

function Register() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  return (
    <main className="flex flex-col gap-6 w-11/12 mx-auto max-w-96 my-11">
      <Header pageLabel="Cadastre-se" />

      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Input
            label="Nome"
            type="text"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Email"
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="submit"
            className="bg-green-2 text-white text-sm py-2 rounded-sm px-tb-14 hover:opacity-80 transition-opacity duration-300 ease-in-out"
          >
            Criar conta
          </button>
          <Link
            href="/login"
            className="flex justify-center items-center outline outline-1 outline-gray-5 text-gray-5 text-sm py-2 rounded-sm px-tb-14 hover:opacity-80 transition-opacity duration-300 ease-in-out"
          >
            Voltar
          </Link>
        </div>
      </form>

      <div className="block h-[1px] bg-gray-3" />

      <div className="flex justify-center gap-1 text-xs text-gray-4">
        <span>Crie uma conta gratuita</span>
      </div>
    </main>
  )
}

export default Register
