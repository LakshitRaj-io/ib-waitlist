import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: todos } = await supabase.from('todos').select()

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-4">Supabase Test Page</h1>
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>{todo.name}</li>
        ))}
        {(!todos || todos.length === 0) && (
          <p>No todos found, but the page loaded successfully!</p>
        )}
      </ul>
    </main>
  )
}
