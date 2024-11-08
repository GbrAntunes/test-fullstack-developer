import "../app/globals.css"
import Input from "@/components/Input";
import { useState } from "react";
import Header from "@/components/Header";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    router.push('/home')
  }

  return (
    <main className="flex flex-col gap-6 w-11/12 mx-auto max-w-96 my-11">
      <Header pageLabel="Entrar" />

      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
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

        <button
          type="submit"
          className="bg-green-2 text-white text-sm py-2 rounded-sm px-tb-14 hover:opacity-80 transition-opacity duration-300 ease-in-out"
        >
          Entrar
        </button>
      </form>

      <div className="block h-[1px] bg-gray-3" />

      <div className="flex justify-center gap-1 text-xs text-gray-4">
        <span>Não tem uma conta?</span>
        <Link href="/register" className="underline cursor-pointer">Cadastre-se!</Link>
      </div>
    </main>
  );
}

export default Login;
