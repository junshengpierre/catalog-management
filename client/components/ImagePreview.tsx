import { useState, useEffect } from 'react'

export const ImagePreview = ({ file }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState(undefined)

  useEffect(() => {
    if (file) {
      setIsLoading(true)

      const reader = new FileReader()

      reader.onloadend = () => {
        setIsLoading(false)
        setImage(reader.result)
      }

      reader.readAsDataURL(file)
    }
  }, [file])

  if (!file) {
    return null
  }

  if (isLoading) {
    return <p>loading...</p>
  }

  return (
    <img
      src={image}
      alt={file.name}
      className="img-thumbnail mt-2 mb-4"
      height={200}
      width={200}
    />
  )
}
