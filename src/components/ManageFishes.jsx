import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";
import LoadingSpinner from "./common/LoadingSpinner";
import { useFishes } from "../contexts/FishesContext";

const ManageFishes = () => {
  const { fishes, setFishesUpdated } = useFishes();

  const deleteFish = async (id) => {
    try {
      await axios.delete(`//localhost:8989/fishes/${id}`);
      setFishesUpdated(true);
      alert("fish deleted successfully");
      setFishesUpdated();
    } catch (err) {
      console.log(err);
    }
  };
  if (!fishes) return <LoadingSpinner />;
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Manage Fishes
      </Typography>
      {fishes && (
        <Typography variant="h6" gutterBottom>
          Total Fishes {fishes.length}
        </Typography>
      )}

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fish Name</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Price</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fishes &&
            fishes.map(({ _id: id, name, weight, price }) => (
              <TableRow key={id}>
                <TableCell>{name}</TableCell>
                <TableCell>{weight} kg</TableCell>
                <TableCell>{price} ৳</TableCell>
                <TableCell align="right">
                  <div>
                    <IconButton aria-label="delete" style={{ color: "green" }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        deleteFish(id);
                      }}
                      aria-label="delete"
                      style={{ color: "red" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageFishes;
