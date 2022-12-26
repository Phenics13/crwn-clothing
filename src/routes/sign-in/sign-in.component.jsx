import {
  signInWithGooglePopUp,
  createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils'

import SignUpForm from '../../compenents/sign-up-form/sign-up-form.component';

const SignIn = () => {
  const logGoogleUser = async () => {
    try {
      const { user } = await signInWithGooglePopUp();
      const userDocRef = await createUserDocumentFromAuth(user);
    } catch (error) {
      console.log('error sign in with Google user', error.message)
    }
  }

  return (
    <div>
      <SignUpForm />
      <button onClick={logGoogleUser}>Sign In with Google</button>
    </div>
  );
}

export default SignIn;