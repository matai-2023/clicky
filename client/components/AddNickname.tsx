import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import nicknameHook from './hooks/useNickname'
import { motion } from 'framer-motion'

function AddNickname() {
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const { getAccessTokenSilently } = useAuth0()
  const useNickname = nicknameHook()

  async function handleClick(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault()
    const token = await getAccessTokenSilently()
    useNickname.nicknameMutation.mutate({ nickname: input, token })
    navigate('/')
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h1 className="text-6xl m-4 text-primary font-bold text-center">
          Add your Nickname
        </h1>
        <div className="flex justify-center gap-4 text-4xl m-8 text-primary font-bold">
          <label htmlFor="nickname">Nickname:</label>
          <input
            id="nickname"
            className="border-2 border-primary rounded"
            placeholder="Enter nickname"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></input>
        </div>
        <div className="flex justify-center gap-4 text-4xl m-8 text-primary font-bold">
          <button
            onClick={handleClick}
            className="border-2 border-primary rounded px-8 hover:bg-pink2 hover:text-pink3 hover:animate-pulse"
          >
            Add Nickname
          </button>
        </div>
      </motion.div>
    </>
  )
}

export default AddNickname
