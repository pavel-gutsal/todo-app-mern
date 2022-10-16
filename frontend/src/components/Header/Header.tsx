import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logOutUser } from '../../features/user/userReducer';
import "./Header.scss";

export const Header = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.user);

  const logOut = () => {
    dispatch(logOutUser());
  }

  return (
    <header className="Header">
      {
        user && (
          <>
            <h3 className="Header__welcome">
              {`Hello, ${user.name}`}
            </h3>
            <button
              className="Header__btn"
              type="button"
              onClick={logOut}
            >
              Log Out
            </button>
          </>
        )
      }
    </header>
  )
}
