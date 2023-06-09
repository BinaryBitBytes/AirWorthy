import { Airliner } from '../src/models/Airliner.js'

export async function ALL_AIRLINERS (req, res) {
  const allAirliners = await Airliner.find({})

  if (!allAirliners) {
    return res.status(400).json({ message: 'No airliners were found' })
  }
  res.status(200).json(allAirliners)
}
