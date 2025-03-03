import pool from "../../../database";
import { Store } from "../models/store.model";

export const createStore = async (store: Store) => {
  const query = `
    INSERT INTO stores (name, address, city, state, postal_code, latitude, longitude) 
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
  `;

  const values = [
    store.name,
    store.address,
    store.city,
    store.state,
    store.postal_code,
    store.latitude,
    store.longitude,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};
