import React from 'react'
import { BackButton } from './style'

interface BackFolderProps {
  handleBackButton: () => void
}

const BackFolder: React.FC<BackFolderProps> = ({ handleBackButton }) => {
  return (
    <>
      <BackButton onClick={handleBackButton}>Retour</BackButton>
    </>
  )
}

export default BackFolder
