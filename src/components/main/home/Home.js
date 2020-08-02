import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { auth } from '../../../firebase';
import { useHistory } from 'react-router-dom';
import SquareLoader from "react-spinners/SquareLoader";
import { css } from "@emotion/core";


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function Home() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      history.push('/auth');
    }
    console.log(history);
  }, []);

  const signOut = () => {
    setLoading(true);
    setTimeout(() => {
      auth.signOut().then(() => {
        localStorage.removeItem('user');
        history.push('/auth');
        toast.success("Successfully logged out!");
      });
    }, 800);

  }

  return (
    <div>
      {loading ? <div style={{ height: '100vh', width: '100vw', position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255, 255, 255, 0.5)' }}>
        <SquareLoader
          css={override}
          size={150}
          color={"#ffc801"}
          loading={loading}
        />
      </div> : null}
      <h1>Home</h1>
      <button onClick={() => signOut()}>Logout</button>

    </div>
  )
}
