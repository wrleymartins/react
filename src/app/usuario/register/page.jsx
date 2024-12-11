'use client'

import HeaderUser from "@/components/components_user/headerUser"
import { useState } from "react"
import { useRouter } from "next/navigation";
import InputField from "@/components/inputFields";


export default function Register() {


  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [tel, setTel] = useState('')
  const router = useRouter();

  const onSubmit = async () => {
    const r = await fetch('http://localhost:4000/user', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, tel })
    })

    if (r?.ok) {

      const data = await r.json()

      console.log(data.message)


      alert("Usuário cadastrado! Redirecionando para home...");

      router.push(`/`)

    } else {

      const data = await r.json()

      if (data.message) {

        if (Array.isArray(data.message)) {

          alert(data.message.join('\n'))

        } else {
          alert(data.message)
        }
      } else {
        alert('Ocorreu um erro desconhecido. verifique os dados')
      }

    }
  }

  return (
    <>
      <HeaderUser />
      <div className="flex justify-center items-center h-screen bg-cdark">
        <div className="bg-cgrey text-cdark p-10 rounded-md shadow-md ">
          <h1 className="text-3xl font-semibold text-center"> Cadastrar </h1>

          <div className="flex flex-col gap-1 w-[300px]">


            <InputField
              id="name"
              label="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <InputField
              id="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />


            <InputField
              id="tel"
              label="Tel"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
            />

          </div>

          <button onClick={onSubmit} className="w-full mt-10 bg-slate-300">Cadastrar</button>

        </div>
      </div>
    </>
  )
}