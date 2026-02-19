/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../services/api";
import { updateUser } from "../services/api"

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: ""
  });

  useEffect(() => {
    if (!id) return;

    getUserById(id)
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error loading user");
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        website: user.website
      });
    }
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>No user found</p>;

  return (
    <div>
      <h1>UserDetails page</h1>
      <p><strong>ID:</strong> {user.id}</p>

      {isEditing ? (
        <div>
          <input
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />

          <input
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          {/*  
          <button
            onClick={() => {
              console.log(formData);
              setIsEditing(false);
            }}
          >
            Save
          </button>
          */}

          <button
            disabled={saving}
            onClick={async () => {
              try {
                setSaving(true);
                setSaveError("");

                const updatedUser = await updateUser(id!, formData);

                setUser(updatedUser);
                setIsEditing(false);
              } catch (err) {
                console.error("Save failed:", err);
                setSaveError("Failed to save changes");
              } finally {
                setSaving(false);
              }
            }}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      ) : (
        <>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Website:</strong> {user.website}</p>
        </>
      )}

      {saveError && <p style={{ color: "red"}}>SaveError</p>}

      {!isEditing && (
        <button onClick={() => setIsEditing(true)}>Edit</button>
      )}

      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}

export default UserDetails;
