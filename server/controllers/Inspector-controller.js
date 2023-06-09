import { Inspector } from '../models'

export async function getAllInspector (req, res) {
  const allInspector = await Inspector.find({})

  if (!allInspector) {
    return res.status(400).json({ message: 'No inspectors were found' })
  }
  res.status(200).json(allInspector)
}
