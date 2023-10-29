import { useContext } from 'react'
import { OutstaticContext } from '../../context'
import { useGitHubCreateCollection } from './github/useGitHubCreateCollection'

export const useCreateCollection = () => {
  const { dataSource } = useContext(OutstaticContext)
  const GitHubCollection = useGitHubCreateCollection()

  const createCollection =
    dataSource === 'github' ? GitHubCollection : () => Promise.resolve(false)
  return createCollection
}
