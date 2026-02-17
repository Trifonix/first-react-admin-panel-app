import { useNavigate } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function UserRow({ user }: any) {
  const navigate = useNavigate();

  return (
    <tr
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/users/${user.id}`)}
    >
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
    </tr>
  );
}

export default UserRow;
