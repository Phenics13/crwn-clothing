import { useState } from 'react';
import { signInWithGooglePopUp, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopUp();
    const userDocRef = await createUserDocumentFromAuth(user);
  }

  return (
    <div>
      <button onClick={logGoogleUser}>Sign In with Google</button>
    </div>
  );
}

export default SignIn;