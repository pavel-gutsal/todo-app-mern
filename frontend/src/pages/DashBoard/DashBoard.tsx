import { CreateTodo } from "../../components/CreateTodo/CreateTodo";
import { TodosList } from "../../components/TodosList/TodosList";
import './DashBoard.scss';

export const DashBoard = () => {
  return (
    <section className="DashBoard">
      <TodosList />
      <CreateTodo />
    </section>
  )
}