import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState("you're not Logged In");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('user');
        setMessage(`Hi ${data.first_name}  ${data.last_name}`);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div>
      <h3>{message}</h3>
    </div>
  );
}
