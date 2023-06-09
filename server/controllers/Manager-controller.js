import { Manager } from '../models'

export async function getAllManager (req, res) {
  const allManager = await Manager.find({})

  if (!allManager) {
    return res.status(400).json({ message: 'No managers were found' })
  }
  res.status(200).json(allManager)
}
