import { useEffect, useState } from "react";
import { getUsers } from "../services/api";
import UserRow from "../components/UserRow"

function Users() {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    )
    .slice(indexOfFirstUser, indexOfLastUser);

  useEffect(() => {
    getUsers()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error loading users");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Users page</h1>

      <input 
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <hr />

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {currentUsers.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "10px" }}>
        {Array.from(
          {
            length: Math.ceil(
              users.filter((user) =>
                user.name.toLowerCase().includes(search.toLowerCase())
              ).length / usersPerPage
            ),
          },
          (_, i) => i + 1
        ).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            style={{ marginRight: "5px" }}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Users;
