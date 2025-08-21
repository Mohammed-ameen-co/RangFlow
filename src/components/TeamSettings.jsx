// src/components/TeamSettings.jsx
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import TeamView from "./TeamView";         
import IndividualView from "./IndividualView"; 

const TeamSettings = () => {
  const { user } = useContext(AuthContext);

  
  if (user?.team) {
    return <TeamView user={user} />;
  } else {
    return <IndividualView />;
  }
};

export default TeamSettings;