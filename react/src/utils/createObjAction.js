import { v4 as uuidv4 } from 'uuid';

const createObjAction = ({ userId, actionType, objId, inicial = null, endPointId = null }) => {
  const action = {
    id: uuidv4(),
    userId,
    actionType,
    objId,
    endPointId,
    date: inicial ? Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365) : Date.now()
  }

  return action;
}

export default createObjAction;