import { Project } from '../src/models/Project.js'

export async function getAllProject (req, res) {
  const allProjects = await Project.find({})

  if (!allProjects) {
    return res.status(400).json({ message: 'No projects were found' })
  }
  res.status(200).json(allProjects)
}
