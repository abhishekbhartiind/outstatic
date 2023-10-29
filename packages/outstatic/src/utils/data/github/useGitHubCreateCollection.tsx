import { useContext } from 'react'
import { OutstaticContext } from '../../../context'
import { useCreateCommitMutation } from '../../../graphql/generated'
import { collectionCommitInput } from '../../collectionCommitInput'
import useOid from '../../hooks/useOid'

export const useGitHubCreateCollection = () => {
  const {
    contentPath,
    monorepoPath,
    session,
    repoSlug,
    repoBranch,
    repoOwner
  } = useContext(OutstaticContext)
  const [createCommit] = useCreateCommitMutation()
  const fetchOid = useOid()
  const createCollection = async (collection: string) => {
    const oid = await fetchOid()
    const owner = repoOwner || session?.user?.login || ''
    const commitInput = collectionCommitInput({
      owner,
      oid,
      repoSlug,
      repoBranch,
      contentPath,
      monorepoPath,
      collection
    })

    const created = await createCommit({ variables: commitInput })

    return created
  }

  return createCollection
}
