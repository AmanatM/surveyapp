import { useState } from 'react'

export const useInputChange = () => {
  const [input, setInput] = useState({})

  const handleInputChange = (e) => {
    console.log()

    setInput({
        ...input,
        [e.target.id]: e.target.value
    })
}

  return [input, handleInputChange]
}