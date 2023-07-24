import Login from "@/views/Login"

export default async function LoginPage() {
  const host = process.env.HOST

  return (
    <Login host={host} />
  )
}
