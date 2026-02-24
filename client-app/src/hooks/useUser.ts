/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getUserById } from "../services/api";

export function useUser(id?: string) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    getUserById(id)
      .then((data) => {
        setUser(data);
        setError("");
      })
      .catch(() => {
        setError("Error loading user");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return { user, loading, error, setUser };
}
