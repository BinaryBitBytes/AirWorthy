import { default as ProjectModel } from "../models";

export async function getAllProject(req, res) {
  const allProject = await ProjectModel.find({});

  if (!allProject) {
    return res.status(400).json({ message: "No projects were found" });
  }
  res.status(200).json(allProject);
}
