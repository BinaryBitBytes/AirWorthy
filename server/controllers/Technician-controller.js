import { Technician } from '../src/models/Technician.js'

export async function getAllTechnician (req, res) {
  const allTechnicians = await Technician.find({})

  if (!allTechnicians) {
    return res.status(400).json({ message: 'No technicians were found' })
  }
  res.status(200).json(allTechnicians)
}
