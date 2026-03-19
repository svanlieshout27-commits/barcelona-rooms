import { supabase } from '../lib/supabase'

export default async function AdminPage() {

  const { data: enquiries } = await supabase
    .from('enquiries')
    .select('*, rooms(title, neighbourhood)')
    .order('created_at', { ascending: false })

  const { data: rooms } = await supabase
    .from('rooms')
    .select('*')

  return (
    <main className='max-w-4xl mx-auto p-8'>

      <h1 className='text-3xl font-bold mb-8'>Admin Panel</h1>

      <h2 className='text-xl font-semibold mb-4'>
        Enquiries ({enquiries?.length})
      </h2>

      <div className='space-y-4 mb-12'>
        {enquiries?.map(e => (
          <div key={e.id} className='border rounded-xl p-5 bg-white'>

            <div className='font-medium'>
              {e.name} — {e.email}
            </div>

            <div className='text-sm text-orange-600 mt-1'>
              Re: {e.rooms?.title} ({e.rooms?.neighbourhood})
            </div>

            <div className='text-gray-600 mt-2 text-sm'>
              {e.message}
            </div>

            <div className='text-xs text-gray-400 mt-2'>
              {new Date(e.created_at).toLocaleString()}
            </div>

          </div>
        ))}
      </div>

      <h2 className='text-xl font-semibold mb-4'>
        Rooms ({rooms?.length})
      </h2>

      <div className='space-y-3'>
        {rooms?.map(r => (
          <div key={r.id} className='border rounded-xl p-4 flex justify-between'>

            <div>
              <div className='font-medium'>{r.title}</div>
              <div className='text-sm text-gray-500'>
                {r.neighbourhood} — €{r.price}/mo
              </div>
            </div>

            <div className={`text-sm px-3 py-1 rounded-full h-fit ${
              r.available
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              {r.available ? 'Available' : 'Soon'}
            </div>

          </div>
        ))}
      </div>

    </main>
  )

}