import { Inspector } from '../src/models/Inspector.js'

export async function getAllInspector (req, res) {
  const allInspectors = await Inspector.find({})

  if (!allInspectors) {
    return res.status(400).json({ message: 'No inspectors were found' })
  }
  res.status(200).json(allInspectors)
}
