import { airlinerSchema } from '../models';

export async function getAllAirliner(req, res) {
  const allAirliner = await airlinerSchema.find({});

  if (!allAirliner) {
    return res.status(400).json({ message: 'No airliners were found' });
  }
  res.status(200).json(allAirliner); //5.12.23 possible bug fix, json() was previously set to allAriline changed to allAirliner
}
