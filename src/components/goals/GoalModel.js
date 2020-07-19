import { useContext } from "react";
import GoalsContext from "../../context/goals/GoalsContext";

const { toggleGoal } = useContext(GoalsContext);

class Goal {
  constructor(content) {
    this.content = content;
    this.isCompleted = false;
  }

  save(id) {
    toggleGoal(id);
  }
}

export default Goal;
