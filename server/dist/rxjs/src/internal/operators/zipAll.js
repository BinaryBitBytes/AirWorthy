import { zip } from '../observable/zip';
import { joinAllInternals } from './joinAllInternals';
export function zipAll(project) {
    return joinAllInternals(zip, project);
}
