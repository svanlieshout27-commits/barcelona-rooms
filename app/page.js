import EnquiryForm from './components/EnquiryForm'
import Chatbot from './components/Chatbot'
import { supabase } from './lib/supabase'
export const dynamic = 'force-dynamic'
export default async function Home() {

  const { data: rooms } = await supabase
    .from('rooms')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className='max-w-6xl mx-auto p-8'>

      <h1 className='text-4xl font-bold mb-2'>Rooms in Barcelona</h1>

      <p className='text-gray-500 mb-10'>
        Hand-picked rooms in the best neighbourhoods
      </p>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>

        <div className='space-y-6'>
          {rooms?.map(room => (
            <div key={room.id} className='border rounded-xl p-6 bg-white shadow'>

              <div className='text-sm text-orange-600 font-medium mb-1'>
                {room.neighbourhood}
              </div>

              <h2 className='text-xl font-semibold mb-2'>{room.title}</h2>

              <p className='text-gray-600 mb-4'>{room.description}</p>

              <span className='text-2xl font-bold'>€{room.price}/mo</span>

              <div className='mt-6 pt-6 border-t'>
                <EnquiryForm roomId={room.id} />
              </div>

            </div>
          ))}
        </div>

        <div className='lg:sticky lg:top-8 h-fit'>
          <Chatbot />
        </div>

      </div>

    </main>
  )

}
