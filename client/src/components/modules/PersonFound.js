import React, { useState } from "react";

const PersonFound = (props) => {
  /**
   * @property {String} name
   * @property {Number} friend_id
   */

  return (
    <div>
      {props.name}
      {props.friend_id}
    </div>
  );
};
