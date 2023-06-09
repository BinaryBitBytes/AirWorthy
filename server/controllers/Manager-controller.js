import { Manager } from '../src/models/Manager.js'

export async function getAllManager (req, res) {
  const allManagers = await Manager.find({})

  if (!allManagers) {
    return res.status(400).json({ message: 'No managers were found' })
  }
  res.status(200).json(allManagers)
}
